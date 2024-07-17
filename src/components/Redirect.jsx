import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/u/');
  }, [navigate]);

  return null; // No necesitamos renderizar nad
};

export default Redirect;
