import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { toast } from '@/hooks/use-toast';

export const AddContributionDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [contributionAmount, setContributionAmount] = useState('');
  const [operation, setOperation] = useState<'add' | 'remove'>('add');
  const { portfolio, updateCash } = usePortfolio();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const digits = contributionAmount.replace(/\D/g, "");
    const amount = digits ? Number(digits) / 100 : 0;
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Valor inválido",
        description: "Por favor, insira um valor válido.",
        variant: "destructive",
      });
      return;
    }

    // Verificar se há saldo suficiente para remover
    if (operation === 'remove' && amount > (portfolio?.cashAmount || 0)) {
      toast({
        title: "Saldo insuficiente",
        description: `Você tem apenas ${formatCurrency((portfolio?.cashAmount || 0).toString())} disponível.`,
        variant: "destructive",
      });
      return;
    }

    // Adicionar ou remover valor do caixa
    const finalAmount = operation === 'add' ? amount : -amount;
    updateCash(finalAmount);
    
    setContributionAmount('');
    setOpen(false);
    
    toast({
      title: operation === 'add' ? "Aporte realizado!" : "Retirada realizada!",
      description: `R$ ${amount.toFixed(2)} ${operation === 'add' ? 'adicionado ao' : 'removido do'} seu caixa.`,
    });
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    const formatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(parseFloat(numericValue) / 100 || 0);
    return formatted;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setContributionAmount(formatted);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">
          <PlusCircle className="mr-2 h-5 w-5" />
          Realizar Aporte
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Gerenciar Caixa</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <Label>Operação</Label>
            <RadioGroup value={operation} onValueChange={(value) => setOperation(value as 'add' | 'remove')}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="add" id="add" />
                <Label htmlFor="add" className="cursor-pointer flex items-center font-normal">
                  <PlusCircle className="mr-2 h-4 w-4 text-primary" />
                  Adicionar valor ao caixa
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="remove" id="remove" />
                <Label htmlFor="remove" className="cursor-pointer flex items-center font-normal">
                  <MinusCircle className="mr-2 h-4 w-4 text-destructive" />
                  Remover valor do caixa
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contribution">Valor</Label>
            <Input
              id="contribution"
              type="text"
              placeholder="R$ 0,00"
              value={contributionAmount}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Saldo atual: <span className="font-semibold text-foreground">{formatCurrency((portfolio?.cashAmount || 0).toString())}</span>
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              {operation === 'add' ? 'Adicionar' : 'Remover'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};