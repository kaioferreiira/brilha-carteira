import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";

export default function Settings() {
  const { user } = useAuth();
  const [isDark, setIsDark] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  // Dados simulados da assinatura
  const subscription = {
    planName: "Pro",
    planType: "Mensal",
    startDate: "01/01/2025",
    endDate: "01/02/2025",
    status: "pago" as const,
  };

  const getStatusBadge = (status: string) => {
    if (status === "pago") {
      return <Badge className="bg-success text-success-foreground">Pago</Badge>;
    }
    return <Badge variant="secondary">Pendente</Badge>;
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Configurações da Conta</h1>
          <p className="text-muted-foreground mt-2">Gerencie suas informações pessoais e preferências</p>
        </div>

        <div className="space-y-6">
          {/* Informações Pessoais */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Atualize seus dados pessoais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                />
              </div>

              <Button className="mt-4">Salvar Alterações</Button>
            </CardContent>
          </Card>

          {/* Segurança */}
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>Gerencie sua senha</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Senha Atual</Label>
                <Input
                  id="current-password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Nova Senha</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>

              <Button className="mt-4">Alterar Senha</Button>
            </CardContent>
          </Card>

          {/* Aparência */}
          <Card>
            <CardHeader>
              <CardTitle>Aparência</CardTitle>
              <CardDescription>Personalize a interface do aplicativo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isDark ? (
                    <Sun className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Moon className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div>
                    <Label htmlFor="theme-toggle">Modo Escuro</Label>
                    <p className="text-sm text-muted-foreground">
                      {isDark ? "Modo escuro ativado" : "Modo claro ativado"}
                    </p>
                  </div>
                </div>
                <Switch
                  id="theme-toggle"
                  checked={isDark}
                  onCheckedChange={toggleTheme}
                />
              </div>
            </CardContent>
          </Card>

          {/* Assinatura */}
          <Card>
            <CardHeader>
              <CardTitle>Assinatura</CardTitle>
              <CardDescription>Informações do seu plano atual</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Nome do Plano</Label>
                  <p className="text-lg font-semibold">{subscription.planName}</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">Tipo de Plano</Label>
                  <p className="text-lg font-semibold">{subscription.planType}</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">Data de Início</Label>
                  <p className="text-lg font-semibold">{subscription.startDate}</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">Data de Término</Label>
                  <p className="text-lg font-semibold">{subscription.endDate}</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">Status</Label>
                  <div>{getStatusBadge(subscription.status)}</div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex gap-3">
                <Button variant="outline">Gerenciar Assinatura</Button>
                <Button variant="outline">Histórico de Pagamentos</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
