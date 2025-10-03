import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MoreVertical, Edit, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Stock } from '@/types';
import { cn } from '@/lib/utils';

interface StockCardProps {
  stock: Stock;
  onEdit: (stock: Stock) => void;
  onDelete: (id: string) => void;
  projectedValue?: number;
}

export const StockCard: React.FC<StockCardProps> = ({ 
  stock, 
  onEdit, 
  onDelete, 
  projectedValue 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getColorByPercentage = (percentage: number) => {
    if (percentage >= 30) return 'hsl(var(--kinvo-green))';
    if (percentage >= 20) return 'hsl(var(--kinvo-teal))';
    if (percentage >= 10) return 'hsl(var(--kinvo-cyan))';
    if (percentage >= 5) return 'hsl(var(--kinvo-blue))';
    return 'hsl(var(--muted-foreground))';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="p-4 bg-gradient-card border-0 shadow-card hover:shadow-float transition-all duration-300">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getColorByPercentage(stock.percentage) }}
            />
            <div>
              <h3 className="font-semibold text-foreground">{stock.symbol}</h3>
              <p className="text-sm text-muted-foreground">{stock.name}</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(stock)}>
                <Edit size={16} className="mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(stock.id)}
                className="text-destructive"
              >
                <Trash2 size={16} className="mr-2" />
                Remover
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Valor Alocado</span>
            <span className="font-semibold text-foreground">
              {formatCurrency(stock.allocatedValue)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Percentual</span>
            <span 
              className="font-bold text-sm"
              style={{ color: getColorByPercentage(stock.percentage) }}
            >
              {stock.percentage.toFixed(1)}%
            </span>
          </div>

          {projectedValue !== undefined && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex justify-between items-center pt-2 border-t border-border"
            >
              <span className="text-sm text-primary">Próximo Aporte</span>
              <div className="flex items-center space-x-1">
                <TrendingUp size={14} className="text-primary" />
                <span className="font-bold text-primary">
                  {formatCurrency(projectedValue)}
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: getColorByPercentage(stock.percentage) }}
              initial={{ width: 0 }}
              animate={{ width: `${stock.percentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};