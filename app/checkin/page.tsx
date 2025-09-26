'use client';

import { useState } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/atoms/input';
import { Label } from '../components/atoms/label';
import FilterWrapper, { FilterButton, FilterCard, FilterSeparator } from '../components/FilterWrapper';

export default function CheckIn() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkInMethod, setCheckInMethod] = useState<'qr' | 'code'>('qr');
  const [checkInData, setCheckInData] = useState({
    name: '',
    email: '',
    company: '',
    area: '',
    purpose: '',
    reservationCode: ''
  });

  const [activeUsers] = useState([
    { id: 1, name: 'João Silva', company: 'TechCorp', area: 'Bloco Frodo', checkIn: '09:30', status: 'active' },
    { id: 2, name: 'Maria Santos', company: 'InnovaCorp', area: 'Bloco Legolas', checkIn: '10:15', status: 'active' },
    { id: 3, name: 'Pedro Costa', company: 'StartupXYZ', area: 'Bloco Aragorn', checkIn: '11:00', status: 'active' },
    { id: 4, name: 'Ana Oliveira', company: 'CorpTech', area: 'Bloco Gimli', checkIn: '13:45', status: 'active' }
  ]);

  const [movements] = useState([
    { id: 1, name: 'Carlos Mendes', action: 'check-in', time: '14:30', area: 'Bloco Frodo' },
    { id: 2, name: 'Lucia Ferreira', action: 'check-out', time: '14:25', area: 'Bloco Legolas' },
    { id: 3, name: 'Roberto Lima', action: 'check-in', time: '14:20', area: 'Bloco Aragorn' },
    { id: 4, name: 'Sofia Alves', action: 'check-out', time: '14:15', area: 'Bloco Gimli' }
  ]);

  const handleCheckIn = () => {
    // Lógica de check-in
    console.log('Check-in realizado:', checkInData);
  };

  const handleCheckOut = (userId: number) => {
    // Lógica de check-out
    console.log('Check-out realizado para usuário:', userId);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Check-in / Check-out</h1>
              <p className="text-muted-foreground">
                Reserve suas mesas com facilidade.
              </p>
            </div>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setIsModalOpen(true)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Novo Check-in
            </Button>
          </div>
        </Card>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <div className="bg-seci text-primary-foreground rounded-lg px-4 py-3 flex items-center gap-3">
              <div className="w-2 h-2 bg-primary-foreground/20 rounded-full"></div>
              <div>
                <p className="text-sm text-black opacity-90">Usuários no Espaço</p>
                <p className="text-xl text-black font-bold">{activeUsers.length}</p>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="bg-secondary text-secondary-foreground rounded-lg px-4 py-3 flex items-center gap-3">
              <div className="w-2 h-2 bg-secondary-foreground/20 rounded-full"></div>
              <div>
                <p className="text-sm opacity-90">Check-ins Hoje</p>
                <p className="text-xl font-bold">12</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="bg-secondary text-black rounded-lg px-4 py-3 flex items-center gap-3">
              <div className="w-2 h-2 bg-white/20 rounded-full"></div>
              <div>
                <p className="text-sm opacity-90">Taxa de Ocupação</p>
                <p className="text-xl font-bold">75%</p>
              </div>
            </div>
          </Card>
        </div>


        {/* Active Users Table */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Usuários Ativos</h2>
            <FilterWrapper>
              <FilterButton>Hoje</FilterButton>
              <FilterCard>
                <span className="text-sm">Todos os Blocos</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </FilterCard>
            </FilterWrapper>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Nome</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Empresa</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Área</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Check-in</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {activeUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium text-foreground">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{user.company}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {user.area}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{user.checkIn}</td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCheckOut(user.id)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H3" />
                        </svg>
                        Check-out
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent Movements Timeline */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Movimentações Recentes</h2>
            <FilterWrapper>
              <FilterButton>Últimas 2h</FilterButton>
              <FilterSeparator />
              <FilterButton>Exportar</FilterButton>
            </FilterWrapper>
          </div>
          
          <div className="space-y-4">
            {movements.map((movement) => (
              <div key={movement.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  movement.action === 'check-in' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {movement.action === 'check-in' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H3" />
                    )}
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{movement.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      movement.action === 'check-in' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {movement.action === 'check-in' ? 'Entrada' : 'Saída'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{movement.area} • {movement.time}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {movement.time}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Modal de Check-in */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            
            {/* Modal Content */}
            <div className="relative bg-background border border-border rounded-lg shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">Novo Check-in</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Form */}
              <div className="p-6">
                {/* Method Selection */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setCheckInMethod('qr')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      checkInMethod === 'qr'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Scanner QR Code
                  </button>
                  <button
                    onClick={() => setCheckInMethod('code')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      checkInMethod === 'code'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Código da Reserva
                  </button>
                </div>

                {/* QR Code Method */}
                {checkInMethod === 'qr' && (
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <div className="w-32 h-32 mx-auto bg-muted rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-16 h-16 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <p className="text-muted-foreground mb-4">Posicione o QR Code da reserva na câmera</p>
                      <Button variant="outline">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Ativar Câmera
                      </Button>
                    </div>
                  </div>
                )}

                {/* Code Method */}
                {checkInMethod === 'code' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="modal-code">Código da Reserva</Label>
                      <Input
                        id="modal-code"
                        placeholder="Digite o código da reserva (ex: RES-2024-001)"
                        value={checkInData.reservationCode}
                        onChange={(e) => setCheckInData({...checkInData, reservationCode: e.target.value})}
                      />
                      <p className="text-xs text-muted-foreground">
                        O código foi enviado por e-mail após a confirmação da reserva
                      </p>
                    </div>
                  </div>
                )}

                {/* Check-in Button */}
                <div className="flex gap-3 mt-6">
                  <Button onClick={handleCheckIn} className="flex-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Realizar Check-in
                  </Button>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button 
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
