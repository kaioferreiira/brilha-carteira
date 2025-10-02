import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle } from 'lucide-react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { toast } from '@/hooks/use-toast';

export const AddContributionDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [contributionAmount, setContributionAmount] = useState('');
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

    const newCashAmount = (portfolio?.cashAmount || 0) + amount;
    updateCash(newCashAmount);
    
    setContributionAmount('');
    setOpen(false);
    
    toast({
      title: "Aporte realizado!",
      description: `R$ ${amount.toFixed(2)} adicionado ao seu caixa.`,
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
          <DialogTitle>Realizar Aporte</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contribution">Valor do Aporte</Label>
            <Input
              id="contribution"
              type="text"
              placeholder="R$ 0,00"
              value={contributionAmount}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Adicionar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};