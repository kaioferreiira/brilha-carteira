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
  allocatedValue: z.number().min(0.01, 'Valor deve ser positivo'),
});

type StockFormData = z.infer<typeof stockSchema>;

interface AddStockDialogProps {
  onAddStock: (stock: Omit<Stock, 'id' | 'percentage'>) => void;
  editingStock?: Stock | null;
  onUpdateStock?: (id: string, updates: Partial<Stock>) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  availableCash: number;
}

export const AddStockDialog: React.FC<AddStockDialogProps> = ({
  onAddStock,
  editingStock,
  onUpdateStock,
  isOpen,
  onOpenChange,
  availableCash,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    setError,
    clearErrors,
  } = useForm<StockFormData>({
    resolver: zodResolver(stockSchema),
    defaultValues: {
      symbol: '',
      name: '',
      allocatedValue: 0,
    },
  });

  useEffect(() => {
    if (editingStock) {
      setValue('symbol', editingStock.symbol);
      setValue('name', editingStock.name);
      setValue('allocatedValue', editingStock.allocatedValue);
    } else {
      reset();
    }
  }, [editingStock, setValue, reset]);

  const onSubmit = async (data: StockFormData) => {
    // Validar se há caixa disponível suficiente
    const maxAvailable = editingStock 
      ? availableCash + editingStock.allocatedValue 
      : availableCash;
    
    if (data.allocatedValue > maxAvailable) {
      setError('allocatedValue', {
        type: 'manual',
        message: `Caixa insuficiente. Disponível: R$ ${maxAvailable.toFixed(2)}`,
      });
      return;
    }

    const stockData = {
      symbol: data.symbol,
      name: data.name,
      allocatedValue: data.allocatedValue,
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

          <div className="space-y-2">
            <Label htmlFor="allocatedValue" className="text-sm font-medium">
              Valor Alocado *
            </Label>
            <div className="text-xs text-muted-foreground mb-1">
              Disponível: R$ {availableCash.toFixed(2)}
            </div>
            <Input
              id="allocatedValue"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              className="h-12 rounded-xl border-0 bg-muted"
              {...register('allocatedValue', { valueAsNumber: true })}
              onChange={(e) => {
                clearErrors('allocatedValue');
                register('allocatedValue', { valueAsNumber: true }).onChange(e);
              }}
            />
            {errors.allocatedValue && (
              <p className="text-destructive text-xs">{errors.allocatedValue.message}</p>
            )}
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