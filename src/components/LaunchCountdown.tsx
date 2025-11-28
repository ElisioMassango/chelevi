import { useState, useEffect } from 'react';
import { env } from '../config/environment';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface LaunchCountdownProps {
  onLaunch?: () => void;
}

const LaunchCountdown = ({ onLaunch }: LaunchCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLaunched, setIsLaunched] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  // Logo URL do Chelevi
  const logoUrl = 'https://chelevi.sparktechnology.cloud/chelevi/Logos/CHE-LEVI-02.png';

  // Data de lançamento: 28/11/2025 às 18h (horário de Moçambique - UTC+2)
  // Usar configuração do environment ou valores padrão
  const launchDateStr = `${env.countdown.launchDate}T${env.countdown.launchTime}:00+02:00`;
  const launchDate = new Date(launchDateStr);

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Obter hora atual em Moçambique (UTC+2)
      const now = new Date();
      const mozambiqueOffset = 2 * 60; // UTC+2 em minutos
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const mozambiqueTime = new Date(utc + (mozambiqueOffset * 60000));

      const difference = launchDate.getTime() - mozambiqueTime.getTime();

      if (difference <= 0) {
        if (!isLaunched) {
          setIsLaunched(true);
          if (onLaunch) {
            onLaunch();
          }
        }
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLaunched) {
    return null; // Não renderiza nada se já foi lançado
  }

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <div className="absolute inset-0 rounded-lg" style={{ backgroundColor: 'rgba(217, 216, 221, 0.3)', filter: 'blur(20px)' }}></div>
        <div className="relative bg-white backdrop-blur-sm rounded-lg p-3 sm:p-4 md:p-6 min-w-[70px] sm:min-w-[90px] md:min-w-[120px] shadow-lg" style={{ border: '1px solid rgba(217, 216, 221, 0.4)' }}>
          <div className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            {String(value).padStart(2, '0')}
          </div>
        </div>
      </div>
      <div className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>
        {label}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden py-4 sm:py-8">
      {/* Animated Background Elements - usando cores do website */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 rounded-full blur-2xl md:blur-3xl animate-pulse"
          style={{ backgroundColor: 'rgba(217, 216, 221, 0.2)' }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 rounded-full blur-2xl md:blur-3xl animate-pulse"
          style={{ backgroundColor: 'rgba(234, 233, 238, 0.3)', animationDelay: '1s' }}
        ></div>
        <div 
          className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full blur-2xl md:blur-3xl"
          style={{ backgroundColor: 'rgba(217, 216, 221, 0.1)' }}
        ></div>
      </div>

      {/* Floating Particles - usando cores do website (menos partículas em mobile) */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
            style={{
              backgroundColor: 'rgba(217, 216, 221, 0.3)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-6xl mx-auto w-full">
        {/* Logo Animado */}
        <div className="mb-6 sm:mb-8 md:mb-12 animate-fade-in">
          <div 
            className={`inline-block transition-all duration-1000 ${logoLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            style={{
              animation: logoLoaded ? 'logoFloat 3s ease-in-out infinite' : 'none',
            }}
          >
            <img 
              src={logoUrl} 
              alt="Chelevi" 
              className="w-32 sm:w-40 md:w-48 lg:w-64 h-auto mx-auto"
              onLoad={() => setLogoLoaded(true)}
              style={{
                filter: 'drop-shadow(0 10px 30px rgba(217, 216, 221, 0.3))',
              }}
            />
          </div>
          {logoLoaded && (
            <div 
              className="w-24 sm:w-32 h-0.5 sm:h-1 mx-auto mt-3 sm:mt-4 md:mt-6"
              style={{
                background: 'linear-gradient(to right, transparent, rgba(217, 216, 221, 0.8), transparent)'
              }}
            ></div>
          )}
        </div>

        {/* Launch Message */}
        <div className="mb-8 sm:mb-12 md:mb-16 animate-fade-in-delay">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-2 sm:mb-3 md:mb-4 px-2" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--color-text-primary)' }}>
            Em Breve
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light px-2" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--color-text-secondary)' }}>
            Estamos a preparar algo extraordinário para si
          </p>
          <p className="text-base font-bold sm:text-lg md:text-xl lg:text-2xl font-light px-2" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--color-text-secondary)' }}>
           Cada vez mais longe. Cada vez maiores. Estás pronta? 
          </p>
        </div>

        {/* Countdown */}
        <div className="mb-8 sm:mb-12 md:mb-16 animate-fade-in-delay-2 px-2">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-8">
            <TimeUnit value={timeLeft.days} label="Dias" />
            <div className="text-2xl sm:text-3xl md:text-4xl font-light hidden sm:block" style={{ color: 'rgba(217, 216, 221, 0.6)' }}>:</div>
            <TimeUnit value={timeLeft.hours} label="Horas" />
            <div className="text-2xl sm:text-3xl md:text-4xl font-light hidden sm:block" style={{ color: 'rgba(217, 216, 221, 0.6)' }}>:</div>
            <TimeUnit value={timeLeft.minutes} label="Minutos" />
            <div className="text-2xl sm:text-3xl md:text-4xl font-light hidden sm:block" style={{ color: 'rgba(217, 216, 221, 0.6)' }}>:</div>
            <TimeUnit value={timeLeft.seconds} label="Segundos" />
          </div>
        </div>

        {/* Launch Date */}
        <div className="animate-fade-in-delay-3 px-4">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--color-text-secondary)' }}>
            Lançamento: <span className="font-medium block sm:inline mt-1 sm:mt-0" style={{ color: 'var(--color-text-primary)' }}>
              {new Date(launchDate).toLocaleDateString('pt-MZ', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })} às {env.countdown.launchTime}
            </span>
          </p>
          <p className="text-xs sm:text-sm md:text-base mt-2" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--color-gray-dark)' }}>
            Horário de Moçambique (CAT)
          </p>
        </div>

        {/* Decorative Elements - ocultos em mobile */}
        <div className="hidden md:block absolute top-0 left-0 w-full h-full pointer-events-none">
          <div 
            className="absolute top-20 left-10 w-1 h-32"
            style={{
              background: 'linear-gradient(to bottom, rgba(217, 216, 221, 0.3), transparent)'
            }}
          ></div>
          <div 
            className="absolute bottom-20 right-10 w-1 h-32"
            style={{
              background: 'linear-gradient(to top, rgba(217, 216, 221, 0.3), transparent)'
            }}
          ></div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.7;
          }
        }
        @keyframes logoFloat {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.02);
          }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-in;
        }
        .animate-fade-in-delay {
          animation: fadeIn 1s ease-in 0.3s both;
        }
        .animate-fade-in-delay-2 {
          animation: fadeIn 1s ease-in 0.6s both;
        }
        .animate-fade-in-delay-3 {
          animation: fadeIn 1s ease-in 0.9s both;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          .animate-fade-in,
          .animate-fade-in-delay,
          .animate-fade-in-delay-2,
          .animate-fade-in-delay-3 {
            animation-duration: 0.8s;
          }
        }
        
        /* Ensure touch-friendly spacing on mobile */
        @media (max-width: 480px) {
          .animate-fade-in-delay-3 {
            padding-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LaunchCountdown;

