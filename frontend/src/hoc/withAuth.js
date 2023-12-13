// hoc/withAuth.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function withAuth(WrappedComponent) {
  return function WithAuth(props) {
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt');

    if (!token) {
      navigate('/login');
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}