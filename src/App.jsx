import React, { useEffect, useState } from 'react'

export default function App() {
  const [data, setData] = useState({ temp: '--', humidity: '--', wind: '--', insight: 'Carregando...' })

  useEffect(() => {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons()
    }
  }, [])

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
    fetch(`${apiUrl}/weather/current`).then(async (res) => {
      if (!res.ok) throw new Error('No data')
      const json = await res.json()
      setData({
        temp: json.temperature ?? json.temp ?? '--',
        humidity: json.humidity ?? '--',
        wind: json.wind ?? json.windSpeed ?? '--',
        insight: json.insight ?? 'Sem insights',
      })
    }).catch(() => {
      setData((d) => ({...d, insight: 'API offline'}))
    })
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-gdash-header text-white p-6 text-center border-b-4" style={{ borderColor: '#3a506b' }}>
        <h1 className="text-2xl font-bold">Dashboard Climático</h1>
        <p className="opacity-80">Dados reais + IA 🚀</p>
      </header>

      <main className="container mx-auto p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 max-w-6xl">
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Temperatura</h2>
          <p id="temp" className="text-2xl font-bold text-slate-900">{data.temp} °C</p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Umidade</h2>
          <p id="humidity" className="text-2xl font-bold text-slate-900">{data.humidity} %</p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Vento</h2>
          <p id="wind" className="text-2xl font-bold text-slate-900">{data.wind} km/h</p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow col-span-1 sm:col-span-2">
          <h2 className="text-lg font-semibold mb-2">Insight de IA</h2>
          <p id="insight" className="text-base text-slate-700">{data.insight}</p>
        </section>
      </main>

      <section className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">Monitoramento Climático Inteligente</h2>
            <p className="text-gray-700 mb-4">Dados em tempo real combinados com análise preditiva de IA.</p>
            <button className="px-5 py-3 bg-gdash-blue text-white rounded-lg">Ver Dashboard</button>
          </div>
          <div className="flex-1">
            <img src="/img/weather.png" alt="Weather illustration" className="rounded-lg shadow-md w-full md:w-auto" />
          </div>
        </div>
      </section>

      <footer className="text-center p-4 bg-slate-800 text-white mt-8">
        <p>GDASH 2025 — Construído por Janine Cunha</p>
      </footer>
    </div>
  )
}
