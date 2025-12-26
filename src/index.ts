import { consumeWeatherQueue } from "./rabbit";

console.log("🚀 Node Worker iniciado...");
consumeWeatherQueue();