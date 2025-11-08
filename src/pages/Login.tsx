import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock, TrendingUp, Shield } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UpfolioLogo } from '@/components/UpfolioLogo';
import { useAuth } from '@/contexts/AuthContext';
import porscheBg from '@/assets/porsche-bg.jpeg';

const loginSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const success = await login(data.email, data.password);
    if (success) {
      navigate('/portfolio');
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${porscheBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/75" />
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
      >
        {/* Card */}
        <div className="bg-white/95 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-3 text-primary"
            >
              Bem-vindo ao Close Friends Pro
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 text-sm md:text-base"
            >
              Sistema avançado de análise de investimentos
            </motion.p>
          </div>

          {/* Logo/Icon */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mb-6"
          >
            <UpfolioLogo size="lg" />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-8"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Close Friends Pro</h2>
            <p className="text-gray-600 text-sm">
              Sistema profissional de gestão de carteiras
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email profissional
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="email"
                  type="email"
                  placeholder="investidor@closefriends.com.br"
                  className="h-12 pl-10 border-gray-300 bg-white rounded-xl text-base"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-destructive text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="h-12 pl-10 pr-12 border-gray-300 bg-white rounded-xl text-base"
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-destructive text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 shadow-lg"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground" />
              ) : (
                'Acessar Sistema'
              )}
            </Button>

            <div className="text-center pt-2">
              <p className="text-xs text-gray-500 mb-1">
                Acesso restrito a investidores cadastrados
              </p>
              <p className="text-xs text-gray-500">
                Demo: investidor@closefriends.com.br / 123456
              </p>
            </div>

            <div className="text-center pt-2">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:text-primary/90 transition-colors"
              >
                Esqueceu a senha?
              </Link>
            </div>
          </motion.form>

          {/* Trust Indicators */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center items-center gap-6 mt-8 pt-6 border-t border-border"
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span>Sistema Validado</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield size={14} className="text-accent" />
              <span>Dados Seguros</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Link */}
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-6"
        >
          <p className="text-sm text-white/80">
            Não tem uma conta?{' '}
            <button
              onClick={() => navigate('/portfolio')}
              className="text-accent hover:text-accent/90 font-medium transition-colors"
            >
              Criar conta gratuita
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;