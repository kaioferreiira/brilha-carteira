import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';
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
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${porscheBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Hero Section */}
      <motion.div
        className="relative z-10 container mx-auto px-6 py-16 md:py-24 flex flex-col items-center justify-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto w-full flex flex-col items-center justify-center">
          {/* Main Content */}
          <div className="text-center mb-16 w-full flex flex-col items-center justify-center">
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
              {/* Texto removido */}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full"
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
                Solicitar Acesso
              </Button>
            </motion.div>
          </div>

          {/* Trust Indicators */}
          {/* Removido os indicadores de confiança */}
          {/* <motion.div
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
          </motion.div> */}
        </div>
      </motion.div>
    </div>
  );
};

export default Welcome;