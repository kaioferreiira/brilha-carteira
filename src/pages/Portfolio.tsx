import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, PieChart as PieChartIcon, Wallet } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useAuth } from '@/contexts/AuthContext';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { StocksSection } from '@/components/StocksSection';
import { PieChart } from '@/components/PieChart';
import { ManageCashDialog } from '@/components/ManageCashDialog';
import { AppLayout } from '@/components/layout/AppLayout';

const Portfolio: React.FC = () => {
  const { user } = useAuth();
  const { portfolio } = usePortfolio();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

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
    <AppLayout>
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Olá, {user?.name}!
          </h1>
          <p className="text-muted-foreground">
            {portfolio.name}
          </p>
        </motion.div>

        {/* Overview Cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-card border-0 shadow-card hover-lift">
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

          <Card className="bg-gradient-card border-0 shadow-card hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <DollarSign size={16} className="mr-2" />
                Caixa Disponível
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(portfolio.cashAmount)}
              </p>
              <p className="text-sm text-muted-foreground">
                Para novos aportes
              </p>
              <ManageCashDialog />
            </CardContent>
          </Card>
        </motion.div>

        {/* Stocks Section */}
        <StocksSection />

        {/* Portfolio Visualization */}
        {portfolio.stocks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-card border-0 shadow-card hover-lift">
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
      </div>
    </AppLayout>
  );
};

export default Portfolio;