import { useState, useEffect } from 'react';
import { api } from '../api/client';

export function useAuth() {
  const [user, setUser] = useState<{ email?: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // naive decode to show email stored as sub in token payload if exists
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ email: payload.email || payload.sub });
      } catch {
        setUser(null);
      }
    }
  }, []);

  async function login(email: string, password: string) {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.access_token);
    const p = JSON.parse(atob(res.data.access_token.split('.')[1] || '{}'));
    setUser({ email: p.email || p.sub });
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  }

  return { user, login, logout };
}
