import React from 'react';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

export default function App() {
  // simple routing
  const path = window.location.pathname;
  if (path.startsWith('/login')) return <Login />;
  return <Dashboard />;
}
