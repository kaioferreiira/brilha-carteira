// Mock data para demonstração do aplicativo

export const mockStocks = [
  {
    symbol: 'PETR4',
    name: 'Petrobras S.A.',
    allocatedValue: 5000,
    weight: 2,
    currentValue: 5200,
    variation: 4.2
  },
  {
    symbol: 'VALE3',
    name: 'Vale S.A.',
    allocatedValue: 3000,
    weight: 1,
    currentValue: 2950,
    variation: -1.7
  },
  {
    symbol: 'ITUB4',
    name: 'Itaú Unibanco',
    allocatedValue: 2000,
    weight: 1,
    currentValue: 2100,
    variation: 5.0
  }
];

export const mockUser = {
  name: 'Investidor',
  email: 'investidor@closefriends.com.br',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=investor'
};