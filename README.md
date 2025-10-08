# Kinvo - Carteira de Investimentos 💼

Uma aplicação moderna e intuitiva para gerenciamento de carteiras de ações, desenvolvida especialmente para jovens universitários que querem controlar seus investimentos de forma prática e visual.

## ✨ Características

- **Design Moderno**: Interface clean inspirada no design das principais fintechs
- **Gradientes Vibrantes**: Sistema de cores baseado em azul/turquesa, roxo e rosa
- **Animações Fluidas**: Transições suaves com Framer Motion
- **Responsivo**: Otimizado para dispositivos móveis
- **Gerenciamento Completo**: Controle total da sua carteira de ações

## 🚀 Funcionalidades

### 📱 Telas Principais

1. **Tela de Apresentação**
   - Background inspirador com gradiente sunset
   - Elementos geométricos flutuantes
   - Call-to-action para login/cadastro

2. **Tela de Login**
   - Design minimalista e clean
   - Validação de formulário com Zod
   - Estados de loading e erro
   - Animações de entrada

3. **Tela de Portfólio**
   - Dashboard completo da carteira
   - Gráfico de pizza personalizado
   - Gerenciamento de caixa
   - Projeção de aportes

### 💰 Gestão de Carteira

- **Adicionar Ações**: Cadastro de ações com símbolo, nome, valor e peso
- **Controle de Pesos**: Sistema de pesos para distribuição proporcional
- **Cálculo Automático**: Percentuais calculados automaticamente
- **Projeção de Aportes**: Visualização de como distribuir novos investimentos
- **Gráfico Visual**: Representação visual da distribuição da carteira

## 🛠 Tecnologias

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool moderna
- **Tailwind CSS** - Styling utilitário
- **Framer Motion** - Animações
- **Shadcn/ui** - Componentes UI
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **React Router DOM** - Navegação
- **Lucide React** - Ícones

## 🎨 Sistema de Design

### Cores Principais
- **Primary**: Turquesa/Cyan (`--kinvo-cyan`)
- **Secondary**: Roxo/Violeta (`--kinvo-violet`) 
- **Accent**: Rosa/Magenta (`--kinvo-pink`)
- **Navy**: Azul Marinho (`--kinvo-navy`)

### Gradientes
- **Kinvo**: Gradiente principal (cyan → violet → pink)
- **Sunset**: Gradiente de fundo (pink → violet → navy)
- **Card**: Gradiente sutil para cards

### Animações
- **Fade In**: Entrada suave de elementos
- **Float**: Movimento flutuante para elementos geométricos
- **Pulse Glow**: Efeito de brilho pulsante
- **Bounce In**: Entrada com efeito de bounce

## 📁 Estrutura do Projeto

```
src/
├── assets/           # Imagens e recursos
├── components/       # Componentes reutilizáveis
│   ├── ui/          # Componentes base (Shadcn)
│   ├── KinvoLogo.tsx
│   ├── ProtectedRoute.tsx
│   ├── PieChart.tsx
│   ├── StockCard.tsx
│   └── AddStockDialog.tsx
├── contexts/         # Contextos React
│   ├── AuthContext.tsx
│   └── PortfolioContext.tsx
├── data/            # Dados mock
├── hooks/           # Hooks customizados
├── pages/           # Páginas da aplicação
│   ├── Welcome.tsx
│   ├── Login.tsx
│   ├── Portfolio.tsx
│   └── NotFound.tsx
├── types/           # Definições TypeScript
└── lib/             # Utilitários
```

## 🔐 Autenticação

Sistema de autenticação simulado com:
- Context API para gerenciamento de estado
- Validação de formulários
- Estados de loading
- Rotas protegidas
- Persistência de sessão

## 📊 Gerenciamento de Estado

- **AuthContext**: Controle de usuário logado
- **PortfolioContext**: Gestão da carteira de investimentos
- **React Query**: Cache e sincronização de dados
- **Local State**: Estados locais dos componentes

## 🎯 Funcionalidades Avançadas

### Sistema de Pesos
Cada ação pode ter um peso diferente, permitindo distribuição proporcional personalizada do caixa disponível.

### Projeção de Aportes
Cálculo automático de quanto investir em cada ação baseado nos pesos configurados e valor em caixa.

### Gráfico Interativo
Visualização em tempo real da distribuição da carteira com animações suaves.

## 🚀 Como Executar

1. **Instale as dependências**:
```bash
npm install
```

2. **Execute em modo desenvolvimento**:
```bash
npm run dev
```

3. **Acesse**: `http://localhost:8080`

## 📱 Como Usar

1. **Tela Inicial**: Clique em "Fazer login" ou "Criar conta"
2. **Login**: Use qualquer email/senha válidos (simulado)
3. **Dashboard**: Visualize sua carteira vazia
4. **Adicionar Ações**: 
   - Clique em "Adicionar Ação"
   - Preencha: símbolo (ex: PETR4), nome, valor alocado, peso
   - Confirme
5. **Gerenciar Caixa**:
   - Atualize o valor em caixa
   - Visualize a projeção de aportes
6. **Acompanhar**: Veja o gráfico e percentuais atualizarem automaticamente

## 🎨 Personalização

O sistema de design está totalmente configurado no `tailwind.config.ts` e `index.css`. Para personalizar:

1. **Cores**: Modifique as variáveis CSS em `index.css`
2. **Componentes**: Customize os componentes Shadcn em `src/components/ui/`
3. **Animações**: Adicione novas animações em `tailwind.config.ts`

## 🔮 Próximos Passos

- [ ] Integração com API real de cotações
- [ ] Histórico de transações
- [ ] Notificações push
- [ ] Gráficos de performance
- [ ] Exportação de relatórios
- [ ] Modo escuro/claro
- [ ] Integração com bancos
- [ ] Análise de risco

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e de demonstração.

---

**Desenvolvido com ❤️ para investidores que querem simplicidade e beleza na gestão de suas carteiras.**