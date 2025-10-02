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

  const addStock = useCallback((newStock: Omit<Stock, 'id' | 'percentage' | 'allocatedValue'> & { weight: number }) => {
    if (!portfolio) return;

    setPortfolio(prev => {
      if (!prev) return prev;
      
      // Calcular o total de pesos incluindo a nova ação
      const totalWeight = prev.stocks.reduce((sum, s) => sum + s.weight, 0) + newStock.weight;
      
      // Calcular quanto alocar para cada ação baseado no peso
      const updatedStocks = prev.stocks.map(stock => {
        const stockPercentage = stock.weight / totalWeight;
        const newAllocatedValue = prev.totalValue * stockPercentage;
        return { ...stock, allocatedValue: newAllocatedValue };
      });
      
      // Calcular valor alocado para a nova ação
      const newStockPercentage = newStock.weight / totalWeight;
      const newStockAllocatedValue = prev.totalValue * newStockPercentage;
      
      const stock: Stock = {
        ...newStock,
        id: Date.now().toString(),
        percentage: 0,
        allocatedValue: newStockAllocatedValue
      };
      
      updatedStocks.push(stock);
      
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
      
      // Se o peso foi atualizado, recalcular todos os valores alocados
      if (updates.weight !== undefined) {
        const totalWeight = prev.stocks.reduce((sum, s) => sum + (s.id === id ? updates.weight! : s.weight), 0);
        
        const updatedStocks = prev.stocks.map(stock => {
          if (stock.id === id) {
            const stockPercentage = updates.weight! / totalWeight;
            const newAllocatedValue = prev.totalValue * stockPercentage;
            return { ...stock, ...updates, allocatedValue: newAllocatedValue };
          } else {
            const stockPercentage = stock.weight / totalWeight;
            const newAllocatedValue = prev.totalValue * stockPercentage;
            return { ...stock, allocatedValue: newAllocatedValue };
          }
        });
        
        const totalAllocated = updatedStocks.reduce((sum, s) => sum + s.allocatedValue, 0);
        const stocksWithPercentages = calculatePercentages(updatedStocks, totalAllocated);
        
        return {
          ...prev,
          stocks: stocksWithPercentages,
          totalValue: totalAllocated,
          updatedAt: new Date()
        };
      }
      
      // Atualização simples sem mudança de peso
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
      
      const updatedStocks = prev.stocks.filter(stock => stock.id !== id);
      
      // Recalcular valores alocados baseado nos pesos restantes
      if (updatedStocks.length > 0) {
        const totalWeight = updatedStocks.reduce((sum, s) => sum + s.weight, 0);
        const recalculatedStocks = updatedStocks.map(stock => {
          const stockPercentage = stock.weight / totalWeight;
          const newAllocatedValue = prev.totalValue * stockPercentage;
          return { ...stock, allocatedValue: newAllocatedValue };
        });
        
        const totalAllocated = recalculatedStocks.reduce((sum, s) => sum + s.allocatedValue, 0);
        const stocksWithPercentages = calculatePercentages(recalculatedStocks, totalAllocated);
        
        return {
          ...prev,
          stocks: stocksWithPercentages,
          totalValue: totalAllocated,
          updatedAt: new Date()
        };
      }
      
      // Se não há mais ações, zerar o total
      return {
        ...prev,
        stocks: [],
        totalValue: 0,
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