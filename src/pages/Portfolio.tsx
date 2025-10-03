import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, DollarSign, TrendingUp, PieChart as PieChartIcon, Plus, Wallet, Settings } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { useAuth } from '@/contexts/AuthContext';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { StockCard } from '@/components/StockCard';
import { AddStockDialog } from '@/components/AddStockDialog';
import { AddContributionDialog } from '@/components/AddContributionDialog';
import { PieChart } from '@/components/PieChart';
import { Stock } from '@/types';
import { toast } from '@/hooks/use-toast';

const Portfolio: React.FC = () => {
  const { user, logout } = useAuth();
  const { 
    portfolio, 
    addStock, 
    updateStock, 
    removeStock, 
    updateCash, 
    calculateProjection 
  } = usePortfolio();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStock, setEditingStock] = useState<Stock | null>(null);
  const [showProjection, setShowProjection] = useState(false);
  const [manageCashOpen, setManageCashOpen] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleEditStock = (stock: Stock) => {
    setEditingStock(stock);
    setIsDialogOpen(true);
  };

  const handleAddStock = () => {
    setEditingStock(null);
    setIsDialogOpen(true);
  };

  const handleManageCash = () => {
    setManageCashOpen(false);
    
    toast({
      title: "Caixa consultado!",
      description: `Valor atual em caixa: ${formatCurrency(portfolio?.cashAmount || 0)}`,
    });
  };

  const projection = calculateProjection();

  // Prepare data for pie chart
  const chartData = portfolio?.stocks.map((stock, index) => ({
    name: stock.symbol,
    value: stock.allocatedValue,
    percentage: stock.percentage,
    color: [
      'hsl(var(--kinvo-green))',
      'hsl(var(--kinvo-teal))',
      'hsl(var(--kinvo-cyan))',
      'hsl(var(--kinvo-blue))',
      'hsl(var(--secondary))'
    ][index % 5]
  })) || [];

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user?.name?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Olá, {user?.name}!
              </h1>
              <p className="text-sm text-muted-foreground">
                {portfolio.name}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={logout}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut size={20} />
          </Button>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Overview Cards */}
        <motion.div
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Wallet size={16} className="mr-2" />
                Total Investido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">
                {formatCurrency(portfolio.totalValue)}
              </p>
              <p className="text-sm text-muted-foreground">
                {portfolio.stocks.length} ações
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <DollarSign size={16} className="mr-2" />
                Caixa Disponível
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(portfolio.cashAmount)}
              </p>
              <p className="text-sm text-muted-foreground">
                Para novos aportes
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cash Management */}
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
                <Dialog open={manageCashOpen} onOpenChange={setManageCashOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      Gerenciar Caixa
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Gerenciar Caixa</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Valor Atual em Caixa</Label>
                        <div className="text-2xl font-bold text-primary">
                          {formatCurrency(portfolio?.cashAmount || 0)}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button type="button" variant="outline" onClick={() => setManageCashOpen(false)} className="flex-1">
                          Fechar
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Botão de Aporte */}
              <AddContributionDialog />

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

        {/* Portfolio Visualization */}
        {portfolio.stocks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <PieChartIcon size={20} className="mr-2 text-primary" />
                  Distribuição da Carteira
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-6">
                <PieChart data={chartData} size={200} strokeWidth={20} />
                
                <div className="grid grid-cols-2 gap-2 w-full">
                  {chartData.map((item) => (
                    <div key={item.name} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {item.percentage.toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Add Stock Button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
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
        </motion.div>

        {/* Stocks List */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
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
      </div>
    </div>
  );
};

export default Portfolio;