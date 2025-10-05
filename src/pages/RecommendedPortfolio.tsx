import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Asset {
  ticker: string;
  recommendation: "COMPRA" | "VENDA";
  allocation: number;
}

const RecommendedPortfolio = () => {
  const navigate = useNavigate();

  const referenceDate = "11/08/25";
  const lastUpdateDate = "08 de Agosto de 2025";
  const analystName = "Renato Calonga";
  const analystCNPI = "CNPI 9390";
  const company = "Ticker Research";

  const assets: Asset[] = [
    { ticker: "MDNE3", recommendation: "COMPRA", allocation: 15 },
    { ticker: "MOVI3", recommendation: "COMPRA", allocation: 12 },
    { ticker: "PETR4", recommendation: "COMPRA", allocation: 18 },
    { ticker: "VALE3", recommendation: "COMPRA", allocation: 20 },
    { ticker: "ITUB4", recommendation: "VENDA", allocation: 10 },
    { ticker: "BBAS3", recommendation: "COMPRA", allocation: 15 },
  ];

  const cashAllocation = 10;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/portfolio")}
            className="gap-2"
          >
            <ArrowLeft size={18} />
            Voltar
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Carteira Recomendada Gusma
          </h1>
          <p className="text-muted-foreground">
            Data de Referência: {referenceDate}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Última atualização: {lastUpdateDate}
          </p>
        </div>

        {/* Table Card */}
        <Card className="mb-8 shadow-card">
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center font-bold">Ativo</TableHead>
                  <TableHead className="text-center font-bold">
                    Recomendação
                  </TableHead>
                  <TableHead className="text-center font-bold">
                    Alocação (%)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map((asset, index) => (
                  <TableRow
                    key={asset.ticker}
                    className={index % 2 === 0 ? "bg-muted/30" : ""}
                  >
                    <TableCell className="text-center font-medium">
                      {asset.ticker}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={
                          asset.recommendation === "COMPRA"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {asset.recommendation}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {asset.allocation}%
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-semibold bg-muted/50">
                  <TableCell className="text-center">Caixa</TableCell>
                  <TableCell className="text-center">-</TableCell>
                  <TableCell className="text-center">{cashAllocation}%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Observation Section */}
        <Card className="mb-6 shadow-card">
          <CardHeader>
            <h2 className="text-xl font-semibold">Observação</h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              As posições acima foram escolhidas usando critérios de análise
              técnica, focando principalmente em <em>momentum</em> e capturar
              tendências de alta nos ativos selecionados.
            </p>
          </CardContent>
        </Card>

        {/* Disclaimer Section */}
        <Card className="shadow-card">
          <CardHeader>
            <h2 className="text-xl font-semibold">Aviso Legal</h2>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              As informações contidas nesta carteira recomendada são baseadas em
              dados públicos e análises técnicas, podendo ser alteradas sem aviso
              prévio. Este material tem caráter meramente informativo e não
              constitui recomendação de investimento.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              É proibida a reprodução total ou parcial deste conteúdo sem
              autorização prévia por escrito.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              O investidor é o único responsável pelas decisões de investimento
              que tomar. Recomendamos a consulta a um profissional qualificado
              antes de realizar qualquer operação financeira.
            </p>
            <div className="pt-4 border-t">
              <p className="text-sm font-medium">
                Analista Responsável: {analystName}
              </p>
              <p className="text-sm text-muted-foreground">
                {analystCNPI} - {company}
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default RecommendedPortfolio;
