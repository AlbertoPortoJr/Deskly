import Layout from '../components/Layout';

export default function Reservations() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h1 className="text-3xl font-bold text-foreground mb-4">Reservas</h1>
          <p className="text-muted-foreground">
            Gerencie reservas e disponibilidade de mesas. Esta página demonstra o sistema de temas em ação.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-primary text-primary-foreground rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Mesas Disponíveis</h3>
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm opacity-90">Mesas disponíveis agora</p>
          </div>
          
          <div className="bg-secondary text-secondary-foreground rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Reservadas Hoje</h3>
            <p className="text-2xl font-bold">8</p>
            <p className="text-sm opacity-90">Reservas para hoje</p>
          </div>
          
          <div className="bg-accent text-accent-foreground rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Capacidade Total</h3>
            <p className="text-2xl font-bold">20</p>
            <p className="text-sm opacity-90">Capacidade total de mesas</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
