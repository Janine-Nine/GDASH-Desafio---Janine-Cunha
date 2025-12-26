import React from 'react';

export default function WeatherCard({ title, value, unit }: { title: string; value: string | number; unit?: string }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold">{value} {unit}</div>
    </div>
  );
}
