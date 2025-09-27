'use client';

import { useState } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import { Button } from '../components/Button';
import EventCard from '../components/EventCard';
import FilterWrapper, { FilterButton, FilterCard } from '../components/FilterWrapper';
import PaginatedCarousel from '../components/PaginatedCarousel';

export default function Events() {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const events = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
      category: 'Workshop',
      status: 'active' as const,
      date: '15 Jan 2024',
      time: '14:00',
      title: 'Workshop de React Avançado',
      location: 'Sala de Treinamento - Bloco Frodo',
      price: 'Gratuito'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop',
      category: 'Palestra',
      status: 'active' as const,
      date: '18 Jan 2024',
      time: '16:00',
      title: 'Inteligência Artificial na Prática',
      location: 'Auditório Principal',
      price: 'Gratuito'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop',
      category: 'Networking',
      status: 'active' as const,
      date: '22 Jan 2024',
      time: '18:00',
      title: 'Happy Hour Tech',
      location: 'Área de Convivência',
      price: 'Gratuito'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      category: 'Workshop',
      status: 'active' as const,
      date: '25 Jan 2024',
      time: '10:00',
      title: 'Design Thinking para Desenvolvedores',
      location: 'Sala de Workshop - Bloco Legolas',
      price: 'Gratuito'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      category: 'Palestra',
      status: 'active' as const,
      date: '28 Jan 2024',
      time: '15:30',
      title: 'Carreira em Tech: Roadmap 2024',
      location: 'Sala de Conferência',
      price: 'Gratuito'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
      category: 'Workshop',
      status: 'active' as const,
      date: '02 Fev 2024',
      time: '09:00',
      title: 'Git e Versionamento Avançado',
      location: 'Laboratório de Informática',
      price: 'Gratuito'
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      category: 'Palestra',
      status: 'active' as const,
      date: '05 Fev 2024',
      time: '19:00',
      title: 'Blockchain e Web3: O Futuro da Internet',
      location: 'Auditório Principal',
      price: 'Gratuito'
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
      category: 'Workshop',
      status: 'active' as const,
      date: '08 Fev 2024',
      time: '13:00',
      title: 'Microserviços com Docker e Kubernetes',
      location: 'Sala de Treinamento - Bloco Aragorn',
      price: 'Gratuito'
    },
    {
      id: 9,
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
      category: 'Networking',
      status: 'active' as const,
      date: '12 Fev 2024',
      time: '17:30',
      title: 'Meetup de Startups',
      location: 'Área de Convivência',
      price: 'Gratuito'
    },
    {
      id: 10,
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop',
      category: 'Workshop',
      status: 'active' as const,
      date: '15 Fev 2024',
      time: '11:00',
      title: 'UX/UI Design: Do Conceito ao Protótipo',
      location: 'Sala de Workshop - Bloco Gimli',
      price: 'Gratuito'
    },
    {
      id: 11,
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop',
      category: 'Palestra',
      status: 'active' as const,
      date: '18 Fev 2024',
      time: '14:30',
      title: 'Segurança Cibernética: Protegendo Dados',
      location: 'Sala de Conferência',
      price: 'Gratuito'
    },
    {
      id: 12,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      category: 'Workshop',
      status: 'active' as const,
      date: '22 Fev 2024',
      time: '09:30',
      title: 'Testes Automatizados com Jest e Cypress',
      location: 'Laboratório de Informática',
      price: 'Gratuito'
    },
    {
      id: 13,
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop',
      category: 'Palestra',
      status: 'active' as const,
      date: '25 Fev 2024',
      time: '16:00',
      title: 'Machine Learning: Algoritmos e Aplicações',
      location: 'Auditório Principal',
      price: 'Gratuito'
    },
    {
      id: 14,
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop',
      category: 'Workshop',
      status: 'active' as const,
      date: '28 Fev 2024',
      time: '10:00',
      title: 'DevOps: CI/CD com GitHub Actions',
      location: 'Sala de Treinamento - Bloco Frodo',
      price: 'Gratuito'
    },
    {
      id: 15,
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
      category: 'Networking',
      status: 'active' as const,
      date: '02 Mar 2024',
      time: '18:30',
      title: 'Tech Talks: Inovação e Tendências',
      location: 'Área de Convivência',
      price: 'Gratuito'
    },
    {
      id: 16,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      category: 'Palestra',
      status: 'active' as const,
      date: '05 Mar 2024',
      time: '14:00',
      title: 'Cloud Computing: AWS vs Azure vs GCP',
      location: 'Sala de Conferência',
      price: 'Gratuito'
    }
  ];


  return (
    <Layout>
      <div className="space-y-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Eventos Internos</h1>
              <p className="text-muted-foreground">
                Workshops, palestras e networking.
              </p>
            </div>
            <Button size="lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Novo Evento
            </Button>
          </div>
        </Card>

        {/* Filters */}
        <div className="flex gap-4 items-center">
          <FilterWrapper>
            <FilterButton>Próximos</FilterButton>
            <FilterButton>Hoje</FilterButton>
            <FilterButton>Esta semana</FilterButton>
            
            <FilterCard onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
              <span className="text-sm">Mais Filtros</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </FilterCard>
          </FilterWrapper>
        </div>

        {/* Advanced Filters Dropdown */}
        {showAdvancedFilters && (
          <div className="flex justify-end">
            <FilterWrapper>
              <FilterCard>
                <span className="text-sm">Workshop</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </FilterCard>

              <FilterCard>
                <span className="text-sm">Palestra</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </FilterCard>

              <FilterCard>
                <span className="text-sm">Networking</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </FilterCard>

              <FilterCard>
                <span className="text-sm">Localização</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </FilterCard>
            </FilterWrapper>
          </div>
        )}

        {/* Events Carousel */}
        <PaginatedCarousel
          items={events}
          itemsPerPage={8}
          title="Próximos Eventos"
          renderItem={(event) => (
            <EventCard
              key={event.id}
              image={event.image}
              category={event.category}
              status={event.status}
              date={event.date}
              time={event.time}
              title={event.title}
              location={event.location}
              price={event.price}
              onClick={() => console.log('Event clicked:', event.id)}
            />
          )}
        />
      </div>
    </Layout>
  );
}
