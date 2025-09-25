import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted/30">
      <div className="text-center space-y-6 p-8">
        <div className="w-24 h-24 mx-auto bg-gradient-kinvo rounded-full flex items-center justify-center">
          <span className="text-4xl font-bold text-white">404</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Página não encontrada</h1>
          <p className="text-muted-foreground mb-6">
            Oops! A página que você está procurando não existe.
          </p>
          <a 
            href="/" 
            className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 font-medium transition-colors"
          >
            Voltar ao Início
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
