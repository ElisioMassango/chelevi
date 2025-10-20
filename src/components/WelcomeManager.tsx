import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import WelcomePopup from './WelcomePopup';

const WelcomeManager: React.FC = () => {
  const { user } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);

  useEffect(() => {
    // Check if user just logged in and hasn't seen welcome popup yet
    if (user && !hasShownWelcome) {
      // Check if this is a new user (you can add more sophisticated logic here)
      const isNewUser = localStorage.getItem('chelevi_new_user') === 'true';
      
      if (isNewUser) {
        setShowWelcome(true);
        setHasShownWelcome(true);
        // Clear the new user flag
        localStorage.removeItem('chelevi_new_user');
      }
    }
  }, [user, hasShownWelcome]);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
  };

  if (!showWelcome || !user) {
    return null;
  }

  return (
    <WelcomePopup
      userName={user.first_name || user.name || 'Cliente'}
      onClose={handleCloseWelcome}
    />
  );
};

export default WelcomeManager;
