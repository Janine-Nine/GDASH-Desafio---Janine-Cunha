import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Login(){
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      window.location.href = '/';
    } catch {
      alert('Falha no login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-100">
      <form onSubmit={submit} className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Entrar</h2>

        <label className="text-sm text-gray-700">Email</label>
        <input className="w-full border p-2 rounded mb-3" value={email} onChange={e=>setEmail(e.target.value)} />

        <label className="text-sm text-gray-700">Senha</label>
        <input type="password" className="w-full border p-2 rounded mb-4" value={password} onChange={e=>setPassword(e.target.value)} />

        <button disabled={loading} className="w-full bg-gdashBlue text-white p-2 rounded">
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
