import Layout from '../components/Layout';
import MetricCard from '../components/MetricCard';

export default function Dashboard() {
  return (
    <Layout>
      <div className="space-y-4">
        {/* Welcome Section */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bem-vindo ao Deskly
          </h1>
          <p className="text-muted-foreground">
            Seu sistema moderno de gerenciamento e reserva de mesas com suporte completo aos modos claro e escuro.
          </p>
        </div>

        {/* Ocupação em Tempo Real */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Ocupação em Tempo Real</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <MetricCard
              title="Taxa de Ocupação Atual"
              value="68%"
              subtitle="12 de 18 espaços ocupados"
              trend={{ value: "+5% vs ontem", isPositive: true }}
            />
            
            <MetricCard
              title="Pessoas Online"
              value="24"
              subtitle="Atualmente no espaço"
              trend={{ value: "+3 vs ontem", isPositive: true }}
            />
            
            <MetricCard
              title="Espaços Disponíveis"
              value="6"
              subtitle="Mesas e salas livres"
              trend={{ value: "-2 vs ontem", isPositive: false }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Indicador de Horários de Pico */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Horários de Pico
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Pico Atual</p>
                    <p className="text-xs text-muted-foreground">14h - 16h • 85% Ocupação</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Próximo Pico</p>
                    <p className="text-xs text-muted-foreground">18h - 20h • 72% Previsão</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alertas de Capacidade */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Alertas de Capacidade
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Ocupação alta em Aragorn</p>
                    <p className="text-xs text-muted-foreground">85% • Próximo da capacidade máxima</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Sistema funcionando normalmente</p>
                    <p className="text-xs text-muted-foreground">Todas as áreas operacionais</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicadores de Performance (KPIs) */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Indicadores de Performance (KPIs)</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <MetricCard
              title="Média de Ocupação Diária"
              value="72%"
              subtitle="Hoje"
              trend={{ value: "+3% vs ontem", isPositive: true }}
            />
            
            <MetricCard
              title="Tendência Semanal"
              value="+8%"
              subtitle="vs. semana anterior"
              trend={{ value: "Crescimento", isPositive: true }}
            />
            
            <MetricCard
              title="Pico de Ocupação"
              value="14h"
              subtitle="Hora de maior uso"
              trend={{ value: "85% ocupação", isPositive: true }}
            />
            
            <MetricCard
              title="Taxa de Utilização"
              value="78%"
              subtitle="Eficiência do espaço"
              trend={{ value: "+2% vs mês anterior", isPositive: true }}
            />
            
            <MetricCard
              title="Receita/Hora Ocupada"
              value="R$ 45"
              subtitle="Eficiência financeira"
              trend={{ value: "+R$ 3 vs ontem", isPositive: true }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
