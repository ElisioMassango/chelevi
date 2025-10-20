import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Hook to automatically scroll to top when route changes
export function useScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when location changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);
}

// Alternative hook for immediate scroll (no animation)
export function useScrollToTopImmediate() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top immediately when location changes
    window.scrollTo(0, 0);
  }, [location.pathname]);
}
