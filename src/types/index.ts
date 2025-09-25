export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  allocatedValue: number;
  weight: number;
  percentage: number;
  currentValue?: number;
  variation?: number;
}

export interface Portfolio {
  id: string;
  userId: string;
  name: string;
  totalValue: number;
  cashAmount: number;
  stocks: Stock[];
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export interface PortfolioContextType {
  portfolio: Portfolio | null;
  isLoading: boolean;
  addStock: (stock: Omit<Stock, 'id' | 'percentage'>) => void;
  updateStock: (id: string, updates: Partial<Stock>) => void;
  removeStock: (id: string) => void;
  updateCash: (amount: number) => void;
  calculateProjection: () => { [stockId: string]: number };
}