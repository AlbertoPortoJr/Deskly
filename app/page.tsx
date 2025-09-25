import Layout from './components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bem-vindo ao Deskly
          </h1>
          <p className="text-muted-foreground">
            Seu sistema moderno de gerenciamento e reserva de mesas com suporte completo aos modos claro e escuro.
          </p>
        </div>

        {/* Theme Demo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Primary Card */}
          <div className="bg-primary text-primary-foreground rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Cartão Principal</h3>
            <p className="text-sm opacity-90">
              Este cartão usa as cores principais do tema e se adapta aos modos claro e escuro.
            </p>
          </div>

          {/* Secondary Card */}
          <div className="bg-secondary text-secondary-foreground rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Cartão Secundário</h3>
            <p className="text-sm opacity-90">
              Cores secundárias fornecem um fundo sutil para seções de conteúdo.
            </p>
          </div>

          {/* Accent Card */}
          <div className="bg-accent text-accent-foreground rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Cartão de Destaque</h3>
            <p className="text-sm opacity-90">
              Cores de destaque são perfeitas para destacar informações importantes.
            </p>
          </div>

          {/* Muted Card */}
          <div className="bg-muted text-muted-foreground rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Cartão Suave</h3>
            <p className="text-sm">
              Cores suaves fornecem um fundo sutil para conteúdo menos proeminente.
            </p>
          </div>

          {/* Destructive Card */}
          <div className="bg-destructive text-destructive-foreground rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Cartão de Erro</h3>
            <p className="text-sm opacity-90">
              Use cores destrutivas para estados de erro e ações perigosas.
            </p>
          </div>

          {/* Border Card */}
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 text-foreground">Cartão com Borda</h3>
            <p className="text-sm text-muted-foreground">
              Cartões com bordas fornecem separação clara entre seções de conteúdo.
            </p>
          </div>
        </div>

        {/* Chart Colors Demo */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Cores dos Gráficos</h3>
          <div className="grid grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className="h-16 rounded-lg flex items-center justify-center text-white font-semibold"
                style={{ backgroundColor: `var(--chart-${num})` }}
              >
                Gráfico {num}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Essas cores são otimizadas para visualização de dados e mantêm bom contraste em ambos os temas.
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Recursos do Sistema de Temas</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Detecção automática da preferência do sistema
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Seleção persistente de tema com localStorage
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Transições suaves entre temas
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Sistema abrangente de tokens de cor
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Fácil extensão com novos temas
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
