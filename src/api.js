export async function getClimateData() {
  return {
    temp: (20 + Math.random() * 10).toFixed(1),
    humidity: (40 + Math.random() * 40).toFixed(0),
    wind: (5 + Math.random() * 20).toFixed(0),
  };
}

export async function getAIInsight(data) {
  return `Com temperatura de ${data.temp}°C, umidade de ${data.humidity}% e vento de ${data.wind} km/h: condições estáveis com leve variação ao longo do dia.`;
}