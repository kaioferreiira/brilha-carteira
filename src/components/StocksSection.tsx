import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { StockCard } from '@/components/StockCard';
import { AddStockDialog } from '@/components/AddStockDialog';
import { Stock } from '@/types';

export const StocksSection: React.FC = () => {
  const { 
    portfolio, 
    addStock, 
    updateStock, 
    removeStock,
    calculateProjection 
  } = usePortfolio();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStock, setEditingStock] = useState<Stock | null>(null);
  const [showProjection, setShowProjection] = useState(false);

  const handleEditStock = (stock: Stock) => {
    setEditingStock(stock);
    setIsDialogOpen(true);
  };

  const handleAddStock = () => {
    setEditingStock(null);
    setIsDialogOpen(true);
  };

  const projection = calculateProjection();

  if (!portfolio) return null;

  return (
    <>
      {/* Stocks Management Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp size={20} className="mr-2 text-primary" />
                Ações
              </div>
              <Button
                onClick={handleAddStock}
                size="sm"
                className="shadow-elegant"
              >
                <Plus size={16} className="mr-1" />
                Adicionar Nova Ação
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Adicionar Nova Ação */}
            <AddStockDialog
              onAddStock={addStock}
              editingStock={editingStock}
              onUpdateStock={updateStock}
              isOpen={isDialogOpen}
              onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) setEditingStock(null);
              }}
              availableCash={portfolio.cashAmount}
            />

            {portfolio.stocks.length > 0 && (
              <div className="flex items-center space-x-4 pt-2">
                <Button
                  variant={showProjection ? "default" : "outline"}
                  onClick={() => setShowProjection(!showProjection)}
                  className="rounded-full"
                >
                  {showProjection ? 'Ocultar' : 'Ver'} Valores Alocados
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Stocks List */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <AnimatePresence mode="popLayout">
          {portfolio.stocks.map((stock) => (
            <StockCard
              key={stock.id}
              stock={stock}
              onEdit={handleEditStock}
              onDelete={removeStock}
              projectedValue={showProjection ? projection[stock.id] : undefined}
            />
          ))}
        </AnimatePresence>

        {portfolio.stocks.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Plus size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Nenhuma ação ainda
            </h3>
            <p className="text-muted-foreground mb-6">
              Adicione sua primeira ação para começar a montar sua carteira
            </p>
            <Button
              onClick={handleAddStock}
              className="rounded-full bg-primary hover:bg-primary/90 shadow-kinvo"
            >
              <Plus size={20} className="mr-2" />
              Adicionar Primeira Ação
            </Button>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};
