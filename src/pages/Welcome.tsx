import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { KinvoLogo } from '@/components/KinvoLogo';
import heroBackground from '@/assets/hero-background.jpg';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-sunset opacity-80" />
      </div>

      {/* Floating Geometric Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-8 w-32 h-40 bg-primary/20 backdrop-blur-md rounded-3xl glass-effect"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <div className="p-6 flex items-center justify-center h-full">
            <KinvoLogo size="lg" />
          </div>
        </motion.div>

        <motion.div
          className="absolute top-32 right-12 w-24 h-32 bg-secondary/20 backdrop-blur-md rounded-2xl glass-effect"
          animate={{ y: [10, -15, 10] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />

        <motion.div
          className="absolute top-1/3 right-8 w-20 h-28 bg-accent/20 backdrop-blur-md rounded-2xl glass-effect"
          animate={{ y: [-5, 15, -5] }}
          transition={{ duration: 7, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col min-h-screen px-6 py-12"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Status Bar Spacer */}
        <div className="h-8" />

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-end pb-12">
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <p className="text-primary text-lg font-medium mb-4">
              Olá! Que bom te ver aqui.
            </p>
            <h1 className="text-white text-4xl font-bold leading-tight mb-4">
              Sua jornada como investidor fica mais rica com o Kinvo.
            </h1>
            <p className="text-white/80 text-lg">
              Vamos começar?
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <Button
              variant="secondary"
              size="lg"
              className="w-full h-14 text-lg font-semibold rounded-full bg-white/90 hover:bg-white text-kinvo-navy transition-all duration-300"
              onClick={() => navigate('/login')}
            >
              Fazer login
            </Button>
            
            <Button
              size="lg"
              className="w-full h-14 text-lg font-semibold rounded-full bg-primary hover:bg-primary/90 transition-all duration-300 shadow-kinvo"
              onClick={() => navigate('/login')}
            >
              Criar conta
            </Button>
          </motion.div>

          {/* Bottom Indicator */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center mt-8"
          >
            <div className="w-32 h-1 bg-white/30 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Welcome;