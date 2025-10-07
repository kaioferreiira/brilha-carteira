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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <motion.div
        className="w-full max-w-md relative z-10"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
      >
        {/* Card */}
        <div className="bg-card border border-border rounded-3xl shadow-2xl p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              Bem-vindo ao Upfolio
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-sm md:text-base"
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
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
              <TrendingUp className="text-white" size={36} />
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-8"
          >
            <h2 className="text-xl font-semibold mb-2">Upfolio Pro</h2>
            <p className="text-muted-foreground text-sm">
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
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="email"
                  type="email"
                  placeholder="investidor@upfolio.com.br"
                  className="h-12 pl-10 border-border bg-background rounded-xl text-base"
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
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="h-12 pl-10 pr-12 border-border bg-background rounded-xl text-base"
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
              className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 shadow-lg"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                'Acessar Sistema'
              )}
            </Button>

            <div className="text-center pt-2">
              <p className="text-xs text-muted-foreground mb-1">
                Acesso restrito a investidores cadastrados
              </p>
              <p className="text-xs text-muted-foreground">
                Demo: investidor@upfolio.com.br / 123456
              </p>
            </div>

            <div className="text-center pt-2">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
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
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Sistema Validado</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield size={14} className="text-green-500" />
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
          <p className="text-sm text-muted-foreground">
            Não tem uma conta?{' '}
            <button
              onClick={() => navigate('/portfolio')}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
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