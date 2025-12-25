import os
import time
import json
import requests
import pika
import os
import time
import json
import requests
import pika
from dotenv import load_dotenv


load_dotenv()


RABBIT_URL = os.getenv("RABBITMQ_URL", "amqp://guest:guest@rabbitmq:5672/")
QUEUE = os.getenv("QUEUE", "weather")
LAT = os.getenv("LAT", "-23.55052")
LON = os.getenv("LON", "-46.633308")
CITY_NAME = os.getenv("CITY_NAME", "MinhaCidade")
INTERVAL = int(os.getenv("INTERVAL_MINUTES", "60"))



def fetch_weather():
	url = f"https://api.open-meteo.com/v1/forecast?latitude={LAT}&longitude={LON}&hourly=temperature_2m,relativehumidity_2m,wind_speed_10m,precipitation_probability&current_weather=true"
	r = requests.get(url, timeout=10)
	r.raise_for_status()
	data = r.json()

	payload = {
		"location": {"lat": LAT, "lon": LON, "name": CITY_NAME},
		"timestamp": data.get("current_weather", {}).get("time"),
		"temperature": data.get("current_weather", {}).get("temperature"),
		"wind_speed": data.get("current_weather", {}).get("windspeed"),
		"humidity": None,
		"source": "open-meteo",
		"raw": data,
	}
	return payload



def publish(payload):
	params = pika.URLParameters(RABBIT_URL)
	conn = pika.BlockingConnection(params)
	channel = conn.channel()
	channel.queue_declare(queue=QUEUE, durable=True)
	channel.basic_publish(
		exchange="",
		routing_key=QUEUE,
		body=json.dumps(payload),
		properties=pika.BasicProperties(delivery_mode=2),
	)
	conn.close()



if __name__ == "__main__":
	while True:
		try:
			p = fetch_weather()
			publish(p)
			print("[producer] published", p.get("timestamp"))
		except Exception as e:
			print("[producer] error:", e)
		time.sleep(INTERVAL * 60)