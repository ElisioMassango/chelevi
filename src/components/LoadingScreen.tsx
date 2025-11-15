import React, { useState, useEffect } from 'react';
import { useTranslation } from '../contexts/LanguageContext';

type LoadingPhase = 'logo' | 'background' | 'content' | 'complete';

const LoadingScreen: React.FC = () => {
  const t = useTranslation();
  const [phase, setPhase] = useState<LoadingPhase>('logo');
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  // Preload logo image
  useEffect(() => {
    const logoImg = new Image();
    logoImg.src = '/images/CHE-LEVI-02.png';
    logoImg.onload = () => {
      setLogoLoaded(true);
    };
    logoImg.onerror = () => {
      // Fallback to external URL if local fails
      const fallbackImg = new Image();
      fallbackImg.src = 'https://chelevi.sparktechnology.cloud/chelevi/Logos/CHE-LEVI-02.png';
      fallbackImg.onload = () => {
        setLogoLoaded(true);
      };
    };
  }, []);

  useEffect(() => {
    let phase1Timer: ReturnType<typeof setTimeout>;
    let phase2Timer: ReturnType<typeof setTimeout>;
    let phase3Timer: ReturnType<typeof setTimeout>;
    let progressInterval: ReturnType<typeof setInterval>;
    let maxTimeout: ReturnType<typeof setTimeout>;
    let handleLoadFn: () => void;

    // Phase 1: Logo appears (0-15%)
    phase1Timer = setTimeout(() => {
      setPhase('logo');
      setProgress(15);
    }, 300);

    // Phase 2: Background elements appear (15-40%)
    phase2Timer = setTimeout(() => {
      setPhase('background');
      setProgress(40);
    }, 900);

    // Phase 3: Content loading starts (40-80%)
    phase3Timer = setTimeout(() => {
      setPhase('content');
      setProgress(60);
      
      // Progressive loading from 60% to 80%
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 80) {
            return prev + 1;
          }
          clearInterval(progressInterval);
          return prev;
        });
      }, 120);
    }, 1600);

    // Phase 4: Complete loading (80-100%)
    handleLoadFn = () => {
      if (progressInterval) clearInterval(progressInterval);
      
      // Complete the progress to 100%
      setProgress(100);
      setPhase('complete');
      
      // Wait a bit before fade out
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }, 800);
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      // If page is already loaded, wait a minimum time for smooth UX
      setTimeout(handleLoadFn,4000);
    } else {
      // Wait for DOMContentLoaded - this fires when DOM is ready but images may still be loading
      document.addEventListener('DOMContentLoaded', () => {
        // Wait minimum time for initial render, then allow images to load in background
        setTimeout(handleLoadFn, 1500);
      });
      
      // Also listen to window load as fallback (fires when all resources including images are loaded)
      window.addEventListener('load', () => {
        setTimeout(handleLoadFn, 300);
      });
      
      // Maximum timeout to ensure loading screen doesn't stay forever
      maxTimeout = setTimeout(() => {
        handleLoadFn();
      }, 3500);
    }
    
      return () => {
      clearTimeout(phase1Timer);
      clearTimeout(phase2Timer);
      clearTimeout(phase3Timer);
      if (progressInterval) clearInterval(progressInterval);
      if ((handleLoadFn as any).domHandler) {
        document.removeEventListener('DOMContentLoaded', (handleLoadFn as any).domHandler);
      }
      if ((handleLoadFn as any).windowHandler) {
        window.removeEventListener('load', (handleLoadFn as any).windowHandler);
      }
      if (maxTimeout) clearTimeout(maxTimeout);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center transition-opacity duration-500 ease-in-out ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Animated Background Elements - Appear in phase 2 */}
      <div 
        className={`absolute inset-0 overflow-hidden transition-opacity duration-700 ${
          phase === 'background' || phase === 'content' || phase === 'complete' 
            ? 'opacity-100' 
            : 'opacity-0'
        }`}
      >
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '3s' }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '3s', animationDelay: '1.5s' }}
        ></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Container - Phase 1 */}
        <div 
          className={`relative transition-all duration-700 ${
            phase === 'logo' || phase === 'background' || phase === 'content' || phase === 'complete'
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-90 translate-y-4'
          }`}
        >
          {/* Glow effect behind logo - Appears in phase 2 */}
          <div 
            className={`absolute inset-0 bg-primary/20 rounded-full blur-2xl transition-opacity duration-700 ${
              phase === 'background' || phase === 'content' || phase === 'complete'
                ? 'opacity-100'
                : 'opacity-0'
            }`}
            style={{
              animation: phase === 'background' || phase === 'content' || phase === 'complete' 
                ? 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' 
                : 'none',
              transform: 'scale(1.5)',
            }}
          ></div>
          
          {/* Logo with smooth bounce - Active in phase 2+ */}
          <div 
            className="relative"
            style={{
              animation: phase === 'background' || phase === 'content' || phase === 'complete'
                ? 'bounce 2s ease-in-out infinite'
                : 'none',
            }}
          > 
            {logoLoaded ? (
              <img
                src="/images/CHE-LEVI-02.png"
                alt="CheLevi"
                className="w-48 md:w-64 h-auto drop-shadow-2xl transition-all duration-500"
                style={{
                  filter: phase === 'background' || phase === 'content' || phase === 'complete'
                    ? 'drop-shadow(0 0 20px rgba(217, 216, 221, 0.5))'
                    : 'drop-shadow(0 0 10px rgba(217, 216, 221, 0.3))',
                }}
                onError={(e) => {
                  // Fallback to external URL if local fails
                  (e.target as HTMLImageElement).src = 'https://chelevi.sparktechnology.cloud/chelevi/Logos/CHE-LEVI-02.png';
                }}
              />
            ) : (
              <div className="w-48 md:w-64 h-20 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
                <div className="w-32 h-12 bg-gray-300 rounded"></div>
              </div>
            )}
          </div>
        </div>

        {/* Loading Dots - Appear in phase 3 */}
        <div 
          className={`mt-8 flex items-center justify-center gap-2 transition-opacity duration-700 ${
            phase === 'content' || phase === 'complete'
              ? 'opacity-100'
              : 'opacity-0'
          }`}
        >
          <div 
            className="w-2 h-2 bg-primary rounded-full"
            style={{
              animation: phase === 'content' || phase === 'complete'
                ? 'bounce 1.4s ease-in-out infinite'
                : 'none',
              animationDelay: '0s',
            }}
          ></div>
          <div 
            className="w-2 h-2 bg-secondary rounded-full"
            style={{
              animation: phase === 'content' || phase === 'complete'
                ? 'bounce 1.4s ease-in-out infinite'
                : 'none',
              animationDelay: '0.2s',
            }}
          ></div>
          <div 
            className="w-2 h-2 bg-accent rounded-full"
            style={{
              animation: phase === 'content' || phase === 'complete'
                ? 'bounce 1.4s ease-in-out infinite'
                : 'none',
              animationDelay: '0.4s',
            }}
          ></div>
        </div>

        {/* Progress Bar - Appears in phase 3 */}
        <div 
          className={`mt-6 w-64 md:w-80 transition-opacity duration-700 ${
            phase === 'content' || phase === 'complete'
              ? 'opacity-100'
              : 'opacity-0'
          }`}
        >
          <div className="h-1 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center text-gray-600 text-xs mt-2 font-medium">
            {progress < 100 ? `${progress}%` : (t?.common?.loading || 'Carregando...')}
          </p>
        </div>
      </div>

      {/* Custom CSS for smooth animations */}
      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;

