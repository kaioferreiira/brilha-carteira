import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { UpfolioLogo } from '@/components/UpfolioLogo';
import { TrendingUp, Shield, BarChart3, PieChart } from 'lucide-react';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <UpfolioLogo size="lg" />
          <Button
            variant="outline"
            onClick={() => navigate('/login')}
            className="rounded-full"
          >
            Entrar
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <motion.div
        className="container mx-auto px-6 py-16 md:py-24"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-16">
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <TrendingUp size={16} />
              Sistema Profissional de Gestão de Investimentos
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
            >
              Bem-vindo ao Upfolio
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
            >
              Sistema avançado de análise e gestão de carteiras de investimento com ferramentas profissionais
            </motion.p>

            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto h-12 px-8 text-base font-semibold rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Acessar Sistema
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto h-12 px-8 text-base font-semibold rounded-full"
              >
                Criar Conta
              </Button>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <PieChart className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Gestão Completa</h3>
              <p className="text-muted-foreground text-sm">
                Visualize e gerencie toda sua carteira de investimentos em um só lugar
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <BarChart3 className="text-secondary" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Análises Detalhadas</h3>
              <p className="text-muted-foreground text-sm">
                Relatórios completos e análises profissionais para tomadas de decisão
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Shield className="text-accent" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Dados Seguros</h3>
              <p className="text-muted-foreground text-sm">
                Seus dados protegidos com as mais modernas tecnologias de segurança
              </p>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Sistema Validado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Dados Seguros</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Acesso Profissional</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Welcome;