import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, ArrowRight, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UpfolioLogo } from '@/components/UpfolioLogo';
import { useAuth } from '@/contexts/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-accent/10 to-primary/10"
          animate={{ scale: [1.1, 1, 1.1], rotate: [0, -90, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen px-6 py-8">
        {/* Header with Logo */}
        <motion.div
          className="flex items-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
        >
          <UpfolioLogo size="lg" />
        </motion.div>

        {/* Title Section */}
        <motion.div
          className="mb-8"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-primary text-base font-medium mb-2">
            Entre no Upfolio ou crie uma conta
          </p>
          <h1 className="text-kinvo-navy text-2xl font-semibold leading-tight">
            Informe seu e-mail de cadastro e senha.
          </h1>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 space-y-6"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-600">
              E-mail:
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="h-12 border-0 bg-gray-100 rounded-xl text-base"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-destructive text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-600">
              Senha:
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="h-12 border-0 bg-gray-100 rounded-xl text-base pr-12"
                {...register('password')}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-destructive text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Bottom Section */}
          <div className="flex-1 flex flex-col justify-end pt-12">
            <div className="space-y-4">
              {/* Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  className="h-14 rounded-full bg-secondary text-white hover:bg-secondary/90 transition-all duration-300"
                  onClick={() => navigate('/portfolio')}
                >
                  <User className="mr-2" size={20} />
                  Criar conta
                </Button>
                
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="h-14 rounded-full bg-primary hover:bg-primary/90 transition-all duration-300 shadow-kinvo"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  ) : (
                    <>
                      Entrar
                      <ArrowRight className="ml-2" size={20} />
                    </>
                  )}
                </Button>
              </div>

              {/* Forgot Password */}
              <div className="text-center pt-4">
                <Link
                  to="/forgot-password"
                  className="text-gray-600 text-sm hover:text-primary transition-colors"
                >
                  Esqueceu a senha?
                </Link>
              </div>

              {/* Bottom Indicator */}
              <div className="flex justify-center pt-6">
                <div className="w-32 h-1 bg-gray-300 rounded-full" />
              </div>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default Login;