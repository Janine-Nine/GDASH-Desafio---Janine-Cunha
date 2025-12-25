import os
import time
import json
import requests
import pika
from dotenv import load_dotenv

load_dotenv()

RABBITMQ_URL = os.getenv("RABBITMQ_URL", "amqp://guest:guest@rabbitmq:5672/")
QUEUE = os.getenv("QUEUE", "weather-data")
SLEEP_SECONDS = int(os.getenv("SLEEP_SECONDS", "3600"))
CITY = os.getenv("CITY", "Pelotas")

# Coordinates for Pelotas (example); change if needed
LAT = os.getenv("LATITUDE", "-31.7708")
LON = os.getenv("LONGITUDE", "-52.3420")

def connect_rabbit():
    params = pika.URLParameters(RABBITMQ_URL)
    return pika.BlockingConnection(params)

def fetch_weather():
    # Using Open-Meteo public API (no key)
    url = f"https://api.open-meteo.com/v1/forecast?latitude={LAT}&longitude={LON}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,windspeed_10m"
    resp = requests.get(url, timeout=15)
    resp.raise_for_status()
    return resp.json()

def normalize(payload):
    now = payload.get("current_weather", {})
    normalized = {
        "city": CITY,
        "timestamp": payload.get("current_weather_time") or now.get("time"),
        "temperature": now.get("temperature"),
        "windspeed": now.get("windspeed"),
        "winddirection": now.get("winddirection"),
        "raw": payload
    }
    return normalized

def produce():
    try:
        conn = connect_rabbit()
        channel = conn.channel()
        channel.queue_declare(queue=QUEUE, durable=True)
    except Exception as e:
        print("Erro conectando RabbitMQ:", e)
        return

    while True:
        try:
            payload = fetch_weather()
            data = normalize(payload)
            body = json.dumps(data, default=str)
            channel.basic_publish(
                exchange="",
                routing_key=QUEUE,
                body=body,
                properties=pika.BasicProperties(
                    delivery_mode=2,  # persistent
                )
            )
            print(f"[Producer] Mensagem enviada: {data['timestamp']} {data['temperature']}°C")
        except Exception as e:
            print("[Producer] Erro ao coletar/enviar:", e)
        time.sleep(SLEEP_SECONDS)

if __name__ == "__main__":
    produce()
