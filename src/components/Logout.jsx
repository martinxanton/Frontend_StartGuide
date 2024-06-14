import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();


  useEffect(() => {
    // Elimina el token del localStorage
    localStorage.removeItem('token');
    // Redirige al login
    navigate('/auth/login');
  }, [navigate]);

  return null; // No necesitamos renderizar nada
};

export default Logout;
