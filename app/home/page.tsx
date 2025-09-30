'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Throttled scroll handler for performance
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const throttledScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  // Setup Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="home-page relative min-h-screen overflow-hidden bg-white">
          {/* Header da Landing Page */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-8 h-8 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg" 
                    role="img" 
                    aria-label="Logo Deskly Pro"
                  ></div>
                  <span className="text-xl font-bold text-gray-900">Deskly Pro</span>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Menu principal">
                  <a 
                    href="#features" 
                    className="text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1 font-medium"
                    aria-label="Ir para seção de funcionalidades"
                  >
                    Funcionalidades
                  </a>
                  <a 
                    href="#pricing" 
                    className="text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1 font-medium"
                    aria-label="Ir para seção de preços"
                  >
                    Preços
                  </a>
                  <a 
                    href="#testimonials" 
                    className="text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1 font-medium"
                    aria-label="Ir para seção de depoimentos"
                  >
                    Depoimentos
                  </a>
                  
                  <Link 
                    href="/dashboard" 
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    aria-label="Acessar painel administrativo"
                  >
                    Acessar Painel
                  </Link>
                </nav>

                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                  aria-expanded={isMenuOpen}
                  aria-controls="mobile-menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
          </div>

              {/* Mobile Navigation */}
              {isMenuOpen && (
                <div id="mobile-menu" className="md:hidden py-4 border-t border-gray-200">
                  <nav className="flex flex-col space-y-4" role="navigation" aria-label="Menu mobile">
                    <a 
                      href="#features" 
                      className="text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1 font-medium"
                      aria-label="Ir para seção de funcionalidades"
                    >
                      Funcionalidades
                    </a>
                    <a 
                      href="#pricing" 
                      className="text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1 font-medium"
                      aria-label="Ir para seção de preços"
                    >
                      Preços
                    </a>
                    <a 
                      href="#testimonials" 
                      className="text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1 font-medium"
                      aria-label="Ir para seção de depoimentos"
                    >
                      Depoimentos
                    </a>
                    
                    <Link 
                      href="/dashboard" 
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-lg font-semibold text-center hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                      aria-label="Acessar painel administrativo"
                    >
                      Acessar Painel
                    </Link>
                  </nav>
                </div>
              )}
        </div>
      </header>

      <div className="relative min-h-screen overflow-hidden">
        {/* Background com gradiente e elementos flutuantes */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-teal-50/20 to-cyan-50/30">
          {/* Elementos flutuantes animados */}
          <div 
            className="absolute top-20 left-10 w-20 h-20 bg-emerald-200 rounded-full opacity-20 animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          />
          <div 
            className="absolute top-40 right-20 w-16 h-16 bg-teal-200 rounded-full opacity-20 animate-pulse"
            style={{ transform: `translateY(${scrollY * -0.05}px)` }}
          />
          <div 
            className="absolute bottom-20 left-1/4 w-24 h-24 bg-cyan-200 rounded-full opacity-20 animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.08}px)` }}
          />
        </div>

        {/* Conteúdo principal */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pt-16">
          {/* Badge de destaque */}
          <div 
            id="hero-badge"
            data-animate
                className={`inline-flex items-center px-4 py-2 mb-8 text-sm font-medium text-emerald-800 bg-emerald-100 rounded-full border border-emerald-200 transition-all duration-700 ease-out ${
              visibleElements.has('hero-badge') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
            Solução empresarial para gestão de espaços colaborativos
          </div>

          {/* Headline principal */}
          <h1 
            id="hero-headline"
            data-animate
                className={`max-w-4xl mb-6 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl transition-all duration-1000 ease-out ${
              visibleElements.has('hero-headline') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            Maximize a{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Ocupação
            </span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>e Receita do seu Coworking
          </h1>

          {/* Subtítulo */}
          <p 
            id="hero-subtitle"
            data-animate
                className={`max-w-2xl mb-12 text-lg text-gray-700 sm:text-xl md:text-2xl transition-all duration-1000 ease-out delay-200 ${
              visibleElements.has('hero-subtitle') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-6'
            }`}
          >
            Plataforma inteligente de gestão que automatiza reservas, otimiza espaços e aumenta a receita do seu coworking com dados em tempo real e insights estratégicos.
          </p>

          {/* Botões de Call-to-Action */}
          <div 
            id="hero-cta"
            data-animate
            className={`flex flex-col items-center gap-4 mb-16 sm:flex-row transition-all duration-1000 ease-out delay-400 ${
              visibleElements.has('hero-cta') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-6'
            }`}
          >
            <Link 
              href="/dashboard" 
                  className="group relative px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300 sm:px-8 sm:py-4 sm:text-lg"
              aria-label="Iniciar teste gratuito do Deskly Pro"
            >
              <span className="relative z-10">Iniciar Teste Gratuito</span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></div>
            </Link>
            
            <Link 
              href="/dashboard" 
                  className="flex items-center px-6 py-3 text-base font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300 sm:px-8 sm:py-4 sm:text-lg shadow-sm"
              aria-label="Agendar demonstração personalizada"
            >
              <svg className="w-4 h-4 mr-2 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Agendar Demo
            </Link>
          </div>

          {/* Métricas transparentes */}
          <div 
            id="hero-metrics"
            data-animate
            className={`grid grid-cols-1 gap-8 mb-16 sm:grid-cols-3 transition-all duration-1000 ease-out delay-600 ${
              visibleElements.has('hero-metrics') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">+25%</div>
                  <div className="text-sm text-gray-600">Aumento na Ocupação</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">-50%</div>
              <div className="text-sm text-gray-600">Redução no Tempo de Gestão</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-600">30d</div>
              <div className="text-sm text-gray-600">Teste Gratuito</div>
            </div>
          </div>


          {/* Indicador de scroll */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg 
              className="w-6 h-6 text-gray-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-label="Indicador de scroll para baixo"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

          {/* SEÇÃO 2: PROBLEMA/SOLUÇÃO */}
          <section id="problem-solution" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header da seção */}
              <div 
                id="problem-solution-header"
                data-animate
                className={`text-center mb-16 transition-all duration-1000 ease-out ${
                  visibleElements.has('problem-solution-header') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Seu Coworking Está{' '}
                  <span className="text-rose-600">Perdendo Dinheiro</span>?
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                  Descubra os problemas mais comuns que afetam a eficiência e receita do seu espaço de coworking
                </p>
              </div>

              {/* Comparação Visual: Problema vs Solução */}
              <div 
                id="problem-solution-comparison"
                data-animate
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 transition-all duration-1000 ease-out delay-200 ${
                  visibleElements.has('problem-solution-comparison') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Lado Esquerdo - PROBLEMAS */}
                <div className="relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-rose-400 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">✗</span>
              </div>
                  <div className="bg-white shadow-xl border-2 border-rose-200 rounded-2xl p-8 h-full">
                <h3 className="text-2xl font-bold text-rose-800 mb-6">
                  Antes: Gestão Caótica
                </h3>
                
                <div className="space-y-6">
                  {/* Problema 1 */}
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-rose-400 rounded-full flex-shrink-0 mt-1"></div>
                    <div>
                      <h4 className="font-semibold text-rose-700 text-rose-800 mb-2">
                        Reservas Desorganizadas
                      </h4>
                      <p className="text-rose-600 text-rose-700 text-sm">
                        Planilhas confusas, double-booking, clientes insatisfeitos
                      </p>
                    </div>
                  </div>

                  {/* Problema 2 */}
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-rose-400 rounded-full flex-shrink-0 mt-1"></div>
                    <div>
                      <h4 className="font-semibold text-rose-700 text-rose-800 mb-2">
                        Perda de Receita
                      </h4>
                      <p className="text-rose-600 text-rose-700 text-sm">
                        Mesas vazias, preços desatualizados, cobrança manual
                      </p>
                    </div>
                  </div>

                  {/* Problema 3 */}
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-rose-400 rounded-full flex-shrink-0 mt-1"></div>
                    <div>
                      <h4 className="font-semibold text-rose-700 text-rose-800 mb-2">
                        Falta de Controle
                      </h4>
                      <p className="text-rose-600 text-rose-700 text-sm">
                        Sem dados reais, decisões no &quot;feeling&quot;, tempo perdido
                      </p>
                    </div>
                  </div>

                  {/* Problema 4 */}
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-rose-400 rounded-full flex-shrink-0 mt-1"></div>
                    <div>
                      <h4 className="font-semibold text-rose-700 text-rose-800 mb-2">
                        Clientes Insatisfeitos
                      </h4>
                      <p className="text-rose-600 text-rose-700 text-sm">
                        Atendimento lento, problemas recorrentes, cancelamentos
                      </p>
                    </div>
                  </div>
                </div>

                {/* Estatística do problema */}
                <div className="mt-8 p-4 bg-rose-100/50 bg-rose-200 rounded-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-rose-700 text-rose-800">-20%</div>
                    <div className="text-sm text-rose-600 text-rose-700">Receita potencial não realizada</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lado Direito - SOLUÇÃO */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">✓</span>
              </div>
                  <div className="bg-white shadow-xl border-2 border-emerald-200 rounded-2xl p-8 h-full">
                <h3 className="text-2xl font-bold text-emerald-800 mb-6">
                  Depois: Deskly Pro
                </h3>
                
                <div className="space-y-6">
                  {/* Solução 1 */}
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-emerald-400 rounded-full flex-shrink-0 mt-1"></div>
                    <div>
                      <h4 className="font-semibold text-emerald-700 text-emerald-800 mb-2">
                        Reservas Inteligentes
                      </h4>
                      <p className="text-emerald-600 text-emerald-700 text-sm">
                        Sistema automatizado, sem conflitos, clientes satisfeitos
                      </p>
                    </div>
                  </div>

                  {/* Solução 2 */}
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-emerald-400 rounded-full flex-shrink-0 mt-1"></div>
                    <div>
                      <h4 className="font-semibold text-emerald-700 text-emerald-800 mb-2">
                        Receita Maximizada
                      </h4>
                      <p className="text-emerald-600 text-emerald-700 text-sm">
                        Ocupação otimizada, preços dinâmicos, cobrança automática
                      </p>
                    </div>
                  </div>

                  {/* Solução 3 */}
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-emerald-400 rounded-full flex-shrink-0 mt-1"></div>
                    <div>
                      <h4 className="font-semibold text-emerald-700 text-emerald-800 mb-2">
                        Controle Total
                      </h4>
                      <p className="text-emerald-600 text-emerald-700 text-sm">
                        Dados em tempo real, decisões baseadas em dados, tempo otimizado
                      </p>
                    </div>
                  </div>

                  {/* Solução 4 */}
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-emerald-400 rounded-full flex-shrink-0 mt-1"></div>
                    <div>
                      <h4 className="font-semibold text-emerald-700 text-emerald-800 mb-2">
                        Clientes Felizes
                      </h4>
                      <p className="text-emerald-600 text-emerald-700 text-sm">
                        Atendimento rápido, experiência fluida, fidelização
                      </p>
                    </div>
                  </div>
                </div>

                {/* Estatística da solução */}
                <div className="mt-8 p-4 bg-emerald-100/50 bg-emerald-200 rounded-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-700 text-emerald-800">+25%</div>
                    <div className="text-sm text-emerald-600 text-emerald-700">Melhoria na eficiência operacional</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

              {/* Estatísticas Impactantes */}
              <div 
                id="impact-stats"
                data-animate
                className={`bg-gradient-to-r from-gray-50 to-emerald-50 rounded-2xl p-8 mb-16 transition-all duration-1000 ease-out delay-400 ${
                  visibleElements.has('impact-stats') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
              >
            <h3 className="text-2xl font-bold text-gray-900 text-gray-900 text-center mb-8">
              O Impacto Real do Deskly Pro
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Estatística 1 */}
              <div className="text-center">
                <div className="text-4xl font-bold text-rose-500 text-rose-800 mb-2">-50%</div>
                <div className="text-sm text-gray-600 text-gray-600 mb-1">Tempo de Gestão</div>
                <div className="text-xs text-gray-500 text-gray-600">Automação de processos</div>
              </div>

              {/* Estatística 2 */}
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-500 text-emerald-800 mb-2">+30%</div>
                <div className="text-sm text-gray-600 text-gray-600 mb-1">Eficiência Operacional</div>
                <div className="text-xs text-gray-500 text-gray-600">Processos otimizados</div>
              </div>

              {/* Estatística 3 */}
              <div className="text-center">
                <div className="text-4xl font-bold text-green-500 text-green-600 mb-2">+15%</div>
                <div className="text-sm text-gray-600 text-gray-600 mb-1">Satisfação Clientes</div>
                <div className="text-xs text-gray-500 text-gray-600">Experiência melhorada</div>
              </div>

              {/* Estatística 4 */}
              <div className="text-center">
                <div className="text-4xl font-bold text-teal-500 text-teal-600 mb-2">6m</div>
                <div className="text-sm text-gray-600 text-gray-600 mb-1">Payback Médio</div>
                <div className="text-xs text-gray-500 text-gray-600">ROI positivo</div>
              </div>
            </div>
          </div>

              {/* Timeline de Implementação */}
              <div 
                id="implementation-timeline"
                data-animate
                className={`bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-1000 ease-out delay-600 ${
                  visibleElements.has('implementation-timeline') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
              >
            <h3 className="text-2xl font-bold text-gray-900 text-gray-900 text-center mb-8">
              Implementação em 5 Passos Simples
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Passo 1 */}
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 text-gray-900 mb-2">Setup</h4>
                <p className="text-sm text-gray-600 text-gray-600">5 minutos para configurar</p>
              </div>

              {/* Passo 2 */}
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 text-gray-900 mb-2">Import</h4>
                <p className="text-sm text-gray-600 text-gray-600">Dados existentes migrados</p>
              </div>

              {/* Passo 3 */}
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 text-gray-900 mb-2">Treinamento</h4>
                <p className="text-sm text-gray-600 text-gray-600">Equipe capacitada</p>
              </div>

              {/* Passo 4 */}
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">4</span>
                </div>
                <h4 className="font-semibold text-gray-900 text-gray-900 mb-2">Go Live</h4>
                <p className="text-sm text-gray-600 text-gray-600">Sistema ativo</p>
              </div>

              {/* Passo 5 */}
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">5</span>
                </div>
                <h4 className="font-semibold text-gray-900 text-gray-900 mb-2">Sucesso</h4>
                <p className="text-sm text-gray-600 text-gray-600">Resultados imediatos</p>
              </div>
            </div>

            {/* Call-to-Action */}
            <div className="text-center mt-8">
              <Link 
                href="/dashboard" 
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-teal-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Começar Experimentação
              </Link>
              <p className="text-sm text-gray-500 text-gray-600 mt-3">
                Setup em 5 minutos • Suporte disponível • 30 dias de teste gratuito
              </p>
            </div>
          </div>
        </div>
      </section>

          {/* SEÇÃO DE TRANSPARÊNCIA */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div 
                id="transparency-header"
                data-animate
                className={`text-center mb-12 transition-all duration-1000 ease-out ${
                  visibleElements.has('transparency-header') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <h2 className="text-3xl font-bold text-gray-900 text-gray-900 mb-4">
                  Transparência e Honestidade
                </h2>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                  Acreditamos em comunicação clara e expectativas realistas
                </p>
              </div>

              <div 
                id="transparency-cards"
                data-animate
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ease-out delay-200 ${
                  visibleElements.has('transparency-cards') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
              >
            {/* Card 1 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-emerald-100 bg-emerald-200 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-emerald-600 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 text-gray-900">Sem Compromisso</h3>
              </div>
              <p className="text-gray-700 text-sm">
                Cancele quando quiser, sem taxas ocultas ou multas por cancelamento.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-100 bg-blue-200 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 text-gray-900">Dados Seguros</h3>
              </div>
              <p className="text-gray-700 text-sm">
                Seus dados são protegidos com criptografia e nunca são compartilhados.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-purple-100 bg-purple-200 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-purple-600 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 text-gray-900">Suporte Real</h3>
              </div>
              <p className="text-gray-700 text-sm">
                Equipe de suporte real, não apenas chatbots. Respostas em até 4 horas.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 text-gray-600 max-w-3xl mx-auto">
              <strong>Disclaimer:</strong> Os resultados podem variar de acordo com o tamanho e complexidade do seu coworking. 
              Nossas métricas são baseadas em estudos internos e feedback de clientes reais. 
              Não garantimos resultados específicos, mas oferecemos todas as ferramentas necessárias para o sucesso.
            </p>
          </div>
        </div>
      </section>

          {/* SEÇÃO 6: PREÇOS */}
          <section id="pricing" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header da seção */}
              <div 
                id="pricing-header"
                data-animate
                className={`text-center mb-16 transition-all duration-1000 ease-out ${
                  visibleElements.has('pricing-header') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <h2 className="text-4xl font-bold text-gray-900 text-gray-900 mb-6">
                  Planos Transparentes e Justos
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                  Escolha o plano ideal para o seu coworking. Sem surpresas, sem taxas ocultas.
                </p>
              </div>

              {/* Toggle Mensal/Anual */}
              <div 
                id="pricing-toggle"
                data-animate
                className={`flex justify-center mb-12 transition-all duration-1000 ease-out delay-200 ${
                  visibleElements.has('pricing-toggle') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-6'
                }`}
              >
            <div className="bg-gray-100 bg-gray-200 rounded-lg p-1 flex">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white bg-white rounded-md shadow-sm">
                Mensal
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:text-gray-900">
                Anual
                <span className="ml-2 px-2 py-1 text-xs bg-green-100 bg-green-200 text-green-800 text-green-800 rounded-full">
                  -20%
                </span>
              </button>
            </div>
          </div>

              {/* Cards de Preços */}
              <div 
                id="pricing-cards"
                data-animate
                className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 ease-out delay-400 ${
                  visibleElements.has('pricing-cards') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
              >
            {/* Plano Starter */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 relative">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 text-gray-900 mb-2">Starter</h3>
                <p className="text-gray-700 mb-6">Perfeito para começar</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900 text-gray-900">R$ 99</span>
                  <span className="text-gray-700">/mês</span>
                </div>
                <Link 
                  href="/dashboard" 
                  className="w-full inline-flex justify-center items-center px-6 py-3 text-base font-medium text-gray-700 bg-gray-100 bg-white text-gray-700 rounded-xl hover:bg-gray-200 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Começar Grátis
                </Link>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-gray-700">Até 50 mesas</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-gray-700">Reservas online</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-gray-700">Dashboard básico</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-gray-700">Suporte por email</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-gray-700">30 dias grátis</span>
                </div>
              </div>
            </div>

            {/* Plano Professional - POPULAR */}
            <div className="bg-white bg-gray-200 rounded-2xl border-2 border-green-500 border-emerald-500 p-8 relative transform scale-105 shadow-xl">
              {/* Badge Popular */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                  Mais Popular
                </span>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 text-gray-900 mb-2">Professional</h3>
                <p className="text-gray-700 mb-6">Para coworkings em crescimento</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900 text-gray-900">R$ 199</span>
                  <span className="text-gray-700">/mês</span>
                </div>
                    <Link 
                      href="/dashboard" 
                      className="w-full inline-flex justify-center items-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      Começar Grátis
                    </Link>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-gray-700">Até 200 mesas</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-gray-700">Reservas + eventos</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-gray-700">Analytics avançados</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-gray-700">Suporte prioritário</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-gray-700">Integrações API</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-gray-700">30 dias grátis</span>
                </div>
              </div>
            </div>

            {/* Plano Enterprise */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 relative">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 text-gray-900 mb-2">Enterprise</h3>
                <p className="text-gray-700 mb-6">Para grandes operações</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900 text-gray-900">R$ 399</span>
                  <span className="text-gray-700">/mês</span>
                </div>
                <Link 
                  href="/dashboard" 
                  className="w-full inline-flex justify-center items-center px-6 py-3 text-base font-medium text-gray-700 bg-gray-100 bg-white text-gray-700 rounded-xl hover:bg-gray-200 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Falar com Vendas
                </Link>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-gray-700">Mesas ilimitadas</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-gray-700">Todas as funcionalidades</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-gray-700">Suporte 24/7</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-gray-700">SLA garantido</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-gray-700">Personalização</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-gray-700">30 dias grátis</span>
                </div>
              </div>
            </div>
          </div>

              {/* Garantias */}
              <div 
                id="pricing-guarantees"
                data-animate
                className={`bg-gray-50 bg-gray-200 rounded-2xl p-8 mb-16 transition-all duration-1000 ease-out delay-600 ${
                  visibleElements.has('pricing-guarantees') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
              >
            <h3 className="text-2xl font-bold text-gray-900 text-gray-900 text-center mb-8">
              Garantias que Fazem a Diferença
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Garantia 1 */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-100 bg-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-emerald-600 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 text-gray-900 mb-2">30 Dias Grátis</h4>
                <p className="text-gray-700 text-sm">
                  Teste todos os recursos sem compromisso. Cancele quando quiser.
                </p>
              </div>

                  {/* Garantia 2 */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-teal-100 bg-teal-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-teal-600 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 text-gray-900 mb-2">Sem Taxas Ocultas</h4>
                <p className="text-gray-700 text-sm">
                  Preço transparente. O que você vê é o que você paga. Sem surpresas.
                </p>
              </div>

                  {/* Garantia 3 */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-cyan-100 bg-cyan-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-cyan-600 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 text-gray-900 mb-2">Suporte Real</h4>
                <p className="text-gray-700 text-sm">
                  Equipe de especialistas disponível para ajudar no seu sucesso.
                </p>
              </div>
            </div>
          </div>

            </div>
          </section>

          {/* Mini Footer */}
          <footer className="py-3 bg-gray-100 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Criado por <span className="font-semibold text-gray-800">Alberto Porto</span>
                </p>
              </div>
            </div>
          </footer>
        </div>
      );
    }
