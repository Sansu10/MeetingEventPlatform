import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  console.log('Protected Route - Current user:', user);
  console.log('Protected Route - Token:', localStorage.getItem('token'));

  if (!user) {
    console.log('No user found, redirecting to signin');
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;