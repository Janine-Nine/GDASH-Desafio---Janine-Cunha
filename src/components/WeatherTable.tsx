import React from 'react';
import { WeatherLog } from '../types';

export default function WeatherTable({ logs }: { logs: WeatherLog[] }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-600">
            <th className="p-2">Data</th>
            <th className="p-2">Cidade</th>
            <th className="p-2">Temp (°C)</th>
            <th className="p-2">Vento</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(l => (
            <tr key={l._id} className="border-t">
              <td className="p-2">{new Date(l.timestamp).toLocaleString()}</td>
              <td className="p-2">{l.city}</td>
              <td className="p-2">{l.temperature ?? '—'}</td>
              <td className="p-2">{l.windspeed ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
