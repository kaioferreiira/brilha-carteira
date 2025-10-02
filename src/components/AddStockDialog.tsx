import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Stock } from '@/types';

const stockSchema = z.object({
  symbol: z.string().min(1, 'Símbolo é obrigatório').max(10, 'Máximo 10 caracteres'),
  name: z.string().min(1, 'Nome é obrigatório').max(50, 'Máximo 50 caracteres'),
  weight: z.number().min(1, 'Peso deve ser pelo menos 1').max(10, 'Peso máximo é 10'),
});

type StockFormData = z.infer<typeof stockSchema>;

interface AddStockDialogProps {
  onAddStock: (stock: Omit<Stock, 'id' | 'percentage' | 'allocatedValue'>) => void;
  editingStock?: Stock | null;
  onUpdateStock?: (id: string, updates: Partial<Stock>) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddStockDialog: React.FC<AddStockDialogProps> = ({
  onAddStock,
  editingStock,
  onUpdateStock,
  isOpen,
  onOpenChange,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<StockFormData>({
    resolver: zodResolver(stockSchema),
    defaultValues: {
      symbol: '',
      name: '',
      weight: 1,
    },
  });

  useEffect(() => {
    if (editingStock) {
      setValue('symbol', editingStock.symbol);
      setValue('name', editingStock.name);
      setValue('weight', editingStock.weight);
    } else {
      reset();
    }
  }, [editingStock, setValue, reset]);

  const onSubmit = async (data: StockFormData) => {
    const stockData = {
      symbol: data.symbol,
      name: data.name,
      weight: data.weight,
    };

    if (editingStock && onUpdateStock) {
      onUpdateStock(editingStock.id, stockData);
    } else {
      onAddStock(stockData);
    }
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-primary hover:bg-primary/90 shadow-kinvo">
          <Plus size={20} className="mr-2" />
          Adicionar Ação
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md mx-4 rounded-2xl border-0 shadow-float">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-bold text-center text-foreground">
            {editingStock ? 'Editar Ação' : 'Nova Ação'}
          </DialogTitle>
        </DialogHeader>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="symbol" className="text-sm font-medium">
                Símbolo *
              </Label>
              <Input
                id="symbol"
                placeholder="ex: PETR4"
                className="h-12 rounded-xl border-0 bg-muted"
                {...register('symbol')}
              />
              {errors.symbol && (
                <p className="text-destructive text-xs">{errors.symbol.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight" className="text-sm font-medium">
                Peso
              </Label>
              <Input
                id="weight"
                type="number"
                min="1"
                max="10"
                placeholder="1"
                className="h-12 rounded-xl border-0 bg-muted"
                {...register('weight', { valueAsNumber: true })}
              />
              {errors.weight && (
                <p className="text-destructive text-xs">{errors.weight.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nome da Empresa *
            </Label>
            <Input
              id="name"
              placeholder="ex: Petrobras S.A."
              className="h-12 rounded-xl border-0 bg-muted"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-destructive text-xs">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2 bg-primary/5 p-4 rounded-xl">
            <p className="text-sm text-muted-foreground">
              💡 O valor será calculado automaticamente com base no peso e no caixa disponível
            </p>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              className="flex-1 h-12 rounded-xl"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                editingStock ? 'Atualizar' : 'Adicionar'
              )}
            </Button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
};