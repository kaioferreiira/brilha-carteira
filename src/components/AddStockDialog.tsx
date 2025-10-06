import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Search, Check } from 'lucide-react';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Stock } from '@/types';

interface StockAPI {
  stock: string;
  name: string;
  close: number;
  logo: string;
}

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
  const [allocatedValueDisplay, setAllocatedValueDisplay] = useState('');
  const [stocks, setStocks] = useState<StockAPI[]>([]);
  const [loadingStocks, setLoadingStocks] = useState(false);
  const [openCombobox, setOpenCombobox] = useState(false);
  const [selectedStock, setSelectedStock] = useState<StockAPI | null>(null);
  
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
    if (isOpen && !editingStock) {
      fetchStocks();
    }
  }, [isOpen, editingStock]);

  const fetchStocks = async () => {
    setLoadingStocks(true);
    try {
      const response = await fetch('https://brapi.dev/api/quote/list', {
        headers: {
          'Authorization': 'Bearer rTpKKDnw8sqGZ38ZWAZEsC'
        }
      });
      const data = await response.json();
      setStocks(data.stocks || []);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    } finally {
      setLoadingStocks(false);
    }
  };

  useEffect(() => {
    if (editingStock) {
      setValue('symbol', editingStock.symbol);
      setValue('name', editingStock.name);
      setValue('allocatedValue', editingStock.allocatedValue);
      setAllocatedValueDisplay(formatCurrencyInput((editingStock.allocatedValue * 100).toString()));
      setSelectedStock(null);
    } else {
      reset();
      setAllocatedValueDisplay('');
      setSelectedStock(null);
    }
  }, [editingStock, setValue, reset]);

  const handleSelectStock = (stock: StockAPI) => {
    setSelectedStock(stock);
    setValue('symbol', stock.stock);
    setValue('name', stock.name);
    setOpenCombobox(false);
    clearErrors('symbol');
    clearErrors('name');
  };

  const formatCurrencyInput = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    const formatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(parseFloat(numericValue) / 100 || 0);
    return formatted;
  };

  const handleAllocatedValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrencyInput(e.target.value);
    setAllocatedValueDisplay(formatted);
    
    const digits = formatted.replace(/\D/g, "");
    const amount = digits ? Number(digits) / 100 : 0;
    setValue('allocatedValue', amount);
    clearErrors('allocatedValue');
  };

  const onSubmit = async (data: StockFormData) => {
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
    setSelectedStock(null);
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
          {!editingStock && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Selecionar Ação *
              </Label>
              <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCombobox}
                    className="w-full h-12 rounded-xl border-0 bg-muted justify-between"
                  >
                    {selectedStock ? (
                      <div className="flex items-center gap-2">
                        <img src={selectedStock.logo} alt="" className="w-5 h-5 rounded" />
                        <span>{selectedStock.stock}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Buscar ação...</span>
                    )}
                    <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Buscar ação..." />
                    <CommandList>
                      <CommandEmpty>
                        {loadingStocks ? 'Carregando...' : 'Nenhuma ação encontrada.'}
                      </CommandEmpty>
                      <CommandGroup>
                        {stocks.map((stock) => (
                          <CommandItem
                            key={stock.stock}
                            value={stock.stock}
                            onSelect={() => handleSelectStock(stock)}
                            className="flex items-center gap-2"
                          >
                            <img src={stock.logo} alt="" className="w-6 h-6 rounded" />
                            <div className="flex flex-col">
                              <span className="font-medium">{stock.stock}</span>
                              <span className="text-xs text-muted-foreground truncate">{stock.name}</span>
                            </div>
                            {selectedStock?.stock === stock.stock && (
                              <Check className="ml-auto h-4 w-4" />
                            )}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {errors.symbol && (
                <p className="text-destructive text-xs">{errors.symbol.message}</p>
              )}
            </div>
          )}

          {(selectedStock || editingStock) && (
            <>
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Ação Selecionada
                </Label>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  {selectedStock && (
                    <img src={selectedStock.logo} alt="" className="w-8 h-8 rounded" />
                  )}
                  <div className="flex flex-col">
                    <span className="font-bold text-lg">
                      {editingStock ? editingStock.symbol : selectedStock?.stock}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {editingStock ? editingStock.name : selectedStock?.name}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="allocatedValue" className="text-sm font-medium">
              Valor Alocado *
            </Label>
            <div className="text-xs text-muted-foreground mb-1">
              Disponível: R$ {availableCash.toFixed(2)}
            </div>
            <Input
              id="allocatedValue"
              type="text"
              placeholder="R$ 0,00"
              className="h-12 rounded-xl border-0 bg-muted"
              value={allocatedValueDisplay}
              onChange={handleAllocatedValueChange}
              required
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