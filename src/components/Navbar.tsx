import React from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Navbar(){
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gdash-header text-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded bg-gdash-blue text-white font-bold">GDASH</div>
          <div className="text-sm text-gray-600">Dashboard Climático</div>
        </div>

        <div className="flex items-center gap-4">
            <img src="/img/gdash-logo.png" alt="GDASH Logo" className="w-10 h-10">
            <>
              <div className="text-sm text-gray-700">{user.email}</div>
              <button onClick={logout} className="text-sm px-3 py-1 bg-red-500 text-white rounded">Sair</button>
            </>
          ) : (
            <a href="/login" className="text-sm text-gray-700">Entrar</a>
          )}
        </div>
      </div>
    </nav>
  );
}
