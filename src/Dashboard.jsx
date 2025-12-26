import { useEffect, useState } from "react";
import { getClimateData, getAIInsight } from "../services/api";

export default function Dashboard() {
  const [temp, setTemp] = useState("--");
  const [humidity, setHumidity] = useState("--");
  const [wind, setWind] = useState("--");
  const [insight, setInsight] = useState("Carregando...");

  useEffect(() => {
    async function loadData() {
      const climate = await getClimateData();
      setTemp(climate.temp);
      setHumidity(climate.humidity);
      setWind(climate.wind);

      const text = await getAIInsight(climate);
      setInsight(text);
    }

    loadData();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="max-w-6xl mx-auto mt-10 px-6 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Monitoramento Climático Inteligente
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Dados em tempo real + análise preditiva de IA.  
            O futuro do clima no seu dashboard.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Atualizar Dados
          </button>
        </div>

        <img
          src="/images/weather-hero.png"
          className="w-full md:w-1/2 rounded-xl shadow-lg"
          alt="Clima"
        />
      </section>

      {/* DASHBOARD CARDS */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14 px-6">

        <section className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between">
            <h3 className="font-semibold">Temperatura</h3>
            <i data-lucide="thermometer" className="w-6 h-6 text-red-500"></i>
          </div>
          <p className="text-3xl font-bold mt-3">{temp} °C</p>
        </section>

        <section className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between">
            <h3 className="font-semibold">Umidade</h3>
            <i data-lucide="droplets" className="w-6 h-6 text-blue-500"></i>
          </div>
          <p className="text-3xl font-bold mt-3">{humidity} %</p>
        </section>

        <section className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between">
            <h3 className="font-semibold">Vento</h3>
            <i data-lucide="wind" className="w-6 h-6 text-slate-500"></i>
          </div>
          <p className="text-3xl font-bold mt-3">{wind} km/h</p>
        </section>

        <section className="bg-white p-6 rounded-xl shadow col-span-1 md:col-span-2 lg:col-span-1">
          <div className="flex justify-between">
            <h3 className="font-semibold">Insight de IA</h3>
            <i data-lucide="brain" className="w-6 h-6 text-purple-600"></i>
          </div>
          <p className="mt-4 text-gray-700">{insight}</p>
        </section>
      </main>
    </>
  );
}
