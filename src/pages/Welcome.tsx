import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TrendingUp, Shield, BarChart3, PieChart } from 'lucide-react';
import porscheBg from '@/assets/porsche-bg.jpeg';

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
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${porscheBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Hero Section */}
      <motion.div
        className="relative z-10 container mx-auto px-6 py-16 md:py-24"
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 backdrop-blur-sm text-cyan-400 text-sm font-medium mb-6"
            >
              <TrendingUp size={16} />
              Sistema Profissional de Gestão de Investimentos
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-white"
            >
              Bem-vindo ao Upfolio
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto"
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
                className="w-full sm:w-auto h-12 px-8 text-base font-semibold rounded-full bg-cyan-500 hover:bg-cyan-600 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Acessar Sistema
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto h-12 px-8 text-base font-semibold rounded-full bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
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
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
                <PieChart className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Gestão Completa</h3>
              <p className="text-white/70 text-sm">
                Visualize e gerencie toda sua carteira de investimentos em um só lugar
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
                <BarChart3 className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Análises Detalhadas</h3>
              <p className="text-white/70 text-sm">
                Relatórios completos e análises profissionais para tomadas de decisão
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
                <Shield className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Dados Seguros</h3>
              <p className="text-white/70 text-sm">
                Seus dados protegidos com as mais modernas tecnologias de segurança
              </p>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center items-center gap-6 text-sm text-white/60"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Sistema Validado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Dados Seguros</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Acesso Profissional</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Welcome;