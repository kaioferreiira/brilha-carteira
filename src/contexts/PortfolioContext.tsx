import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { PortfolioContextType, Portfolio, Stock } from '@/types';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

interface PortfolioProviderProps {
  children: React.ReactNode;
}

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Inicializar portfolio quando usuário faz login
  useEffect(() => {
    if (user && !portfolio) {
      const initialPortfolio: Portfolio = {
        id: '1',
        userId: user.id,
        name: 'Minha Carteira',
        totalValue: 0,
        cashAmount: 10000, // Valor inicial em caixa
        stocks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setPortfolio(initialPortfolio);
    } else if (!user) {
      setPortfolio(null);
    }
  }, [user, portfolio]);

  const calculatePercentages = useCallback((stocks: Stock[], totalValue: number) => {
    return stocks.map(stock => ({
      ...stock,
      percentage: totalValue > 0 ? (stock.allocatedValue / totalValue) * 100 : 0
    }));
  }, []);

  const addStock = useCallback((newStock: Omit<Stock, 'id' | 'percentage'>) => {
    if (!portfolio) return;

    const stock: Stock = {
      ...newStock,
      id: Date.now().toString(),
      percentage: 0
    };

    setPortfolio(prev => {
      if (!prev) return prev;
      
      const updatedStocks = [...prev.stocks, stock];
      const totalAllocated = updatedStocks.reduce((sum, s) => sum + s.allocatedValue, 0);
      const stocksWithPercentages = calculatePercentages(updatedStocks, totalAllocated);
      
      return {
        ...prev,
        stocks: stocksWithPercentages,
        totalValue: totalAllocated,
        updatedAt: new Date()
      };
    });

    toast({
      title: "Ação adicionada!",
      description: `${newStock.name} foi adicionada à sua carteira.`,
    });
  }, [portfolio, calculatePercentages]);

  const updateStock = useCallback((id: string, updates: Partial<Stock>) => {
    if (!portfolio) return;

    setPortfolio(prev => {
      if (!prev) return prev;
      
      const oldStock = prev.stocks.find(stock => stock.id === id);
      const oldAllocatedValue = oldStock?.allocatedValue || 0;
      const newAllocatedValue = updates.allocatedValue || oldAllocatedValue;
      const difference = newAllocatedValue - oldAllocatedValue;
      
      const updatedStocks = prev.stocks.map(stock =>
        stock.id === id ? { ...stock, ...updates } : stock
      );
      
      const totalAllocated = updatedStocks.reduce((sum, s) => sum + s.allocatedValue, 0);
      const stocksWithPercentages = calculatePercentages(updatedStocks, totalAllocated);
      
      // Abater a diferença do caixa disponível
      const newCashAmount = Math.max(0, prev.cashAmount - difference);
      
      return {
        ...prev,
        stocks: stocksWithPercentages,
        totalValue: totalAllocated,
        cashAmount: newCashAmount,
        updatedAt: new Date()
      };
    });
  }, [portfolio, calculatePercentages]);

  const removeStock = useCallback((id: string) => {
    if (!portfolio) return;

    setPortfolio(prev => {
      if (!prev) return prev;
      
      const updatedStocks = prev.stocks.filter(stock => stock.id !== id);
      const totalAllocated = updatedStocks.reduce((sum, s) => sum + s.allocatedValue, 0);
      const stocksWithPercentages = calculatePercentages(updatedStocks, totalAllocated);
      
      return {
        ...prev,
        stocks: stocksWithPercentages,
        totalValue: totalAllocated,
        updatedAt: new Date()
      };
    });

    toast({
      title: "Ação removida",
      description: "A ação foi removida da sua carteira.",
    });
  }, [portfolio, calculatePercentages]);

  const updateCash = useCallback((amount: number) => {
    if (!portfolio) return;

    setPortfolio(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        cashAmount: amount,
        updatedAt: new Date()
      };
    });
  }, [portfolio]);

  const calculateProjection = useCallback(() => {
    if (!portfolio) return {};

    const totalWeight = portfolio.stocks.reduce((sum, stock) => sum + stock.weight, 0);
    const projection: { [stockId: string]: number } = {};

    portfolio.stocks.forEach(stock => {
      const stockWeight = totalWeight > 0 ? stock.weight / totalWeight : 0;
      projection[stock.id] = portfolio.cashAmount * stockWeight;
    });

    return projection;
  }, [portfolio]);

  const value: PortfolioContextType = {
    portfolio,
    isLoading,
    addStock,
    updateStock,
    removeStock,
    updateCash,
    calculateProjection,
  };

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
};