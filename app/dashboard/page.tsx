import Layout from '../components/Layout';
import MetricCard from '../components/MetricCard';
import Card from '../components/Card';
import { Button } from '../components/Button';
import Link from 'next/link';
import { BarChart } from '../components/ui/bar-chart';
import { LineChart } from '../components/ui/line-chart';
import { AreaChart } from '../components/ui/area-chart';
import GraphCard from '../components/GraphCard';

export default function Dashboard() {
  // Dados mockados para demonstração
  const currentTime = new Date().toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const upcomingEvents = [
    { id: 1, title: 'Workshop de React Avançado', time: '18:00', location: 'Sala de Treinamento', attendees: 12 },
    { id: 2, title: 'Networking Tech', time: '19:30', location: 'Área de Convivência', attendees: 25 },
    { id: 3, title: 'Palestra: IA na Prática', time: '20:00', location: 'Auditório Principal', attendees: 40 }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section com informações do dia */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Dashboard Deskly
              </h1>
              <p className="text-muted-foreground">
                {currentDate} • {currentTime}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-3">
              <Link href="/reservations">
                <Button variant="outline" size="sm">
                  Ver Reservas
                </Button>
              </Link>
              <Link href="/events">
                <Button variant="outline" size="sm">
                  Ver Eventos
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Ações Rápidas</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/reservations">
              <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Nova Reserva</p>
                    <p className="text-sm text-muted-foreground">Criar reserva</p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/events">
              <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Novo Evento</p>
                    <p className="text-sm text-muted-foreground">Criar evento</p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/checkin">
              <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Check-in</p>
                    <p className="text-sm text-muted-foreground">Registrar entrada</p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/reports">
              <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Relatórios</p>
                    <p className="text-sm text-muted-foreground">Ver análises</p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
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

        {/* Próximos Eventos */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Próximos Eventos</h2>
            <Link href="/events">
              <Button variant="outline" size="sm">
                Ver Todos
              </Button>
            </Link>
          </div>
          
          <Card>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 bg-blue-50/50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{event.time}</p>
                      <p className="text-xs text-muted-foreground">{event.attendees} participantes</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Indicadores de Performance (KPIs) com Gráficos Profissionais */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-foreground">Indicadores de Performance (KPIs)</h2>
          
          {/* Gráficos de Métricas - Primeira Linha */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GraphCard 
              title="Ocupação por Hora" 
              subtitle="Últimas 24 horas"
            >
              <AreaChart
                data={[
                  { name: '00:00', value: 5 },
                  { name: '04:00', value: 3 },
                  { name: '08:00', value: 25 },
                  { name: '12:00', value: 65 },
                  { name: '16:00', value: 82 },
                  { name: '20:00', value: 35 }
                ]}
                height={256}
                color="#f59e0b"
              />
            </GraphCard>

            <GraphCard 
              title="Ocupação por Dia da Semana" 
              subtitle="Análise semanal"
            >
              <BarChart
                data={[
                  { name: 'Seg', value: 68 },
                  { name: 'Ter', value: 75 },
                  { name: 'Qua', value: 82 },
                  { name: 'Qui', value: 78 },
                  { name: 'Sex', value: 85 },
                  { name: 'Sáb', value: 45 },
                  { name: 'Dom', value: 25 }
                ]}
                height={256}
                color="#ef4444"
              />
            </GraphCard>
          </div>

          {/* Gráficos de Métricas - Segunda Linha */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GraphCard 
              title="Ocupação por Espaço" 
              subtitle="Distribuição atual por áreas"
            >
              <BarChart
                data={[
                  { name: 'Aragorn', value: 95 },
                  { name: 'Gimli', value: 78 },
                  { name: 'Legolas', value: 62 },
                  { name: 'Frodo', value: 45 },
                  { name: 'Sam', value: 38 },
                  { name: 'Gandalf', value: 29 }
                ]}
                height={256}
                color="#3b82f6"
              />
            </GraphCard>

            <GraphCard 
              title="Tendências de Uso" 
              subtitle="Análise temporal dos últimos 30 dias"
            >
              <LineChart
                data={[
                  { name: 'Jan 1', value: 45 },
                  { name: 'Jan 8', value: 52 },
                  { name: 'Jan 15', value: 38 },
                  { name: 'Jan 22', value: 61 },
                  { name: 'Jan 29', value: 48 },
                  { name: 'Feb 5', value: 55 },
                  { name: 'Feb 12', value: 42 },
                  { name: 'Feb 19', value: 58 },
                  { name: 'Feb 26', value: 67 },
                  { name: 'Mar 5', value: 53 }
                ]}
                height={256}
                color="#10b981"
              />
            </GraphCard>
          </div>
        </div>

      </div>
    </Layout>
  );
}