import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import WeatherCard from '../components/WeatherCard';
import WeatherTable from '../components/WeatherTable';
import { WeatherLog } from '../types';

export default function Dashboard(){
  const [logs, setLogs] = useState<WeatherLog[]>([]);
  const [insights, setInsights] = useState<any>(null);

  useEffect(() => {
    fetchLogs();
    fetchInsights();
  }, []);

  async function fetchLogs(){
    try {
      const res = await api.get('/weather/logs');
      setLogs(res.data);
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchInsights(){
    try {
      const res = await api.get('/weather/insights');
      setInsights(res.data);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <WeatherCard title="Temperatura atual" value={logs[0]?.temperature ?? '—'} unit="°C" />
        <WeatherCard title="Vento" value={logs[0]?.windspeed ?? '—'} unit="km/h" />
        <WeatherCard title="Última leitura" value={logs[0] ? new Date(logs[0].timestamp).toLocaleString() : '—'} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <WeatherTable logs={logs} />
        </div>

        <div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Insights</h3>
            <pre className="text-sm">{insights ? JSON.stringify(insights, null, 2) : 'Carregando...'}</pre>
            <div className="mt-4 flex flex-col gap-2">
              <a className="block text-center bg-gray-800 text-white py-2 rounded" href={`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/weather/export.csv`}>Exportar CSV</a>
              <a className="block text-center bg-gray-600 text-white py-2 rounded" href={`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/weather/export.xlsx`}>Exportar XLSX</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
