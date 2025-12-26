export type WeatherLog = {
  _id?: string;
  timestamp: string;
  city?: string;
  temperature?: number;
  windspeed?: number;
  winddirection?: number;
  raw?: any;
};
