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

    setPortfolio(prev => {
      if (!prev) return prev;
      
      const stock: Stock = {
        ...newStock,
        id: Date.now().toString(),
        percentage: 0,
      };
      
      const updatedStocks = [...prev.stocks, stock];
      const totalAllocated = updatedStocks.reduce((sum, s) => sum + s.allocatedValue, 0);
      const stocksWithPercentages = calculatePercentages(updatedStocks, totalAllocated);
      
      // Deduzir o valor alocado do caixa disponível
      const newCashAmount = prev.cashAmount - newStock.allocatedValue;
      
      return {
        ...prev,
        stocks: stocksWithPercentages,
        totalValue: totalAllocated,
        cashAmount: newCashAmount,
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
      
      const oldStock = prev.stocks.find(s => s.id === id);
      if (!oldStock) return prev;
      
      // Se o valor alocado foi atualizado, ajustar o caixa
      if (updates.allocatedValue !== undefined && updates.allocatedValue !== oldStock.allocatedValue) {
        const difference = updates.allocatedValue - oldStock.allocatedValue;
        const newCashAmount = prev.cashAmount - difference;
        
        const updatedStocks = prev.stocks.map(stock =>
          stock.id === id ? { ...stock, ...updates } : stock
        );
        
        const totalAllocated = updatedStocks.reduce((sum, s) => sum + s.allocatedValue, 0);
        const stocksWithPercentages = calculatePercentages(updatedStocks, totalAllocated);
        
        return {
          ...prev,
          stocks: stocksWithPercentages,
          totalValue: totalAllocated,
          cashAmount: newCashAmount,
          updatedAt: new Date()
        };
      }
      
      // Atualização simples sem mudança de valor alocado
      const updatedStocks = prev.stocks.map(stock =>
        stock.id === id ? { ...stock, ...updates } : stock
      );
      
      const totalAllocated = updatedStocks.reduce((sum, s) => sum + s.allocatedValue, 0);
      const stocksWithPercentages = calculatePercentages(updatedStocks, totalAllocated);
      
      return {
        ...prev,
        stocks: stocksWithPercentages,
        totalValue: totalAllocated,
        updatedAt: new Date()
      };
    });
  }, [portfolio, calculatePercentages]);

  const removeStock = useCallback((id: string) => {
    if (!portfolio) return;

    setPortfolio(prev => {
      if (!prev) return prev;
      
      // Encontrar a ação que está sendo removida para devolver o valor ao caixa
      const removedStock = prev.stocks.find(stock => stock.id === id);
      const updatedStocks = prev.stocks.filter(stock => stock.id !== id);
      
      // Devolver o valor alocado ao caixa
      const newCashAmount = removedStock ? prev.cashAmount + removedStock.allocatedValue : prev.cashAmount;
      
      if (updatedStocks.length > 0) {
        const totalAllocated = updatedStocks.reduce((sum, s) => sum + s.allocatedValue, 0);
        const stocksWithPercentages = calculatePercentages(updatedStocks, totalAllocated);
        
        return {
          ...prev,
          stocks: stocksWithPercentages,
          totalValue: totalAllocated,
          cashAmount: newCashAmount,
          updatedAt: new Date()
        };
      }
      
      // Se não há mais ações, zerar o total
      return {
        ...prev,
        stocks: [],
        totalValue: 0,
        cashAmount: newCashAmount,
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
      
      const newCashAmount = prev.cashAmount + amount;
      
      return {
        ...prev,
        cashAmount: newCashAmount,
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