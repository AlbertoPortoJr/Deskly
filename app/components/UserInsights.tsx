'use client';

interface UserData {
  id: string;
  name: string;
  email: string;
  visits: number;
  hoursSpent: number;
  lastVisit: string;
  favoriteSpace: string;
  satisfaction: number;
  status: 'active' | 'inactive' | 'new';
}

interface UserInsightsProps {
  data: UserData[];
  className?: string;
}

export default function UserInsights({ data, className = '' }: UserInsightsProps) {
  const topUsers = data.slice(0, 10);
  const activeUsers = data.filter(user => user.status === 'active').length;
  const newUsers = data.filter(user => user.status === 'new').length;
  const avgSatisfaction = (data.reduce((sum, user) => sum + user.satisfaction, 0) / data.length).toFixed(1);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Métricas Gerais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Usuários Ativos</p>
              <p className="text-2xl font-bold text-foreground">{activeUsers}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Novos Usuários</p>
              <p className="text-2xl font-bold text-foreground">{newUsers}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🆕</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Satisfação Média</p>
              <p className="text-2xl font-bold text-foreground">{avgSatisfaction}/5</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Visitas</p>
              <p className="text-2xl font-bold text-foreground">
                {data.reduce((sum, user) => sum + user.visits, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top 10 Usuários Mais Ativos */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Top 10 Usuários Mais Ativos</h3>
        <div className="space-y-3">
          {topUsers.map((user, index) => (
            <div key={user.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-foreground">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="text-center">
                  <p className="font-semibold text-foreground">{user.visits}</p>
                  <p className="text-xs text-muted-foreground">visitas</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">{user.hoursSpent}h</p>
                  <p className="text-xs text-muted-foreground">horas</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">{user.satisfaction}/5</p>
                  <p className="text-xs text-muted-foreground">satisfação</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.status === 'active' ? 'bg-green-100 text-green-800' :
                  user.status === 'new' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {user.status === 'active' ? 'Ativo' : user.status === 'new' ? 'Novo' : 'Inativo'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Padrões de Comportamento */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Espaços Favoritos</h3>
          <div className="space-y-3">
            {['Aragorn', 'Frodo', 'Legolas', 'Gandalf', 'Gimli'].map((space) => {
              const count = Math.floor(Math.random() * 20) + 5;
              return (
                <div key={space} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{space}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(count / 25) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Horários Preferenciais</h3>
          <div className="space-y-3">
            {[
              { time: '08:00 - 10:00', users: 15, percentage: 25 },
              { time: '10:00 - 12:00', users: 22, percentage: 35 },
              { time: '12:00 - 14:00', users: 18, percentage: 30 },
              { time: '14:00 - 16:00', users: 12, percentage: 20 },
              { time: '16:00 - 18:00', users: 8, percentage: 15 }
            ].map((slot, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">{slot.time}</span>
                  <span className="text-sm text-muted-foreground">{slot.users} usuários</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${slot.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Retenção de Usuários */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Análise de Retenção</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">68%</div>
            <p className="text-sm text-muted-foreground">Taxa de Retenção</p>
            <p className="text-xs text-muted-foreground mt-1">Usuários que retornaram</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">32%</div>
            <p className="text-sm text-muted-foreground">Novos Usuários</p>
            <p className="text-xs text-muted-foreground mt-1">Primeira visita</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">4.2</div>
            <p className="text-sm text-muted-foreground">NPS Score</p>
            <p className="text-xs text-muted-foreground mt-1">Satisfação geral</p>
          </div>
        </div>
      </div>
    </div>
  );
}
