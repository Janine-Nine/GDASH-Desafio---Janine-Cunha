# python-producer/producer.py
import json
import time
import random
import os
from datetime import datetime
import pika
from dotenv import load_dotenv

load_dotenv()

RABBIT_URL = os.getenv("RABBIT_URL", "amqp://guest:guest@localhost:5672/%2f")
QUEUE_NAME = os.getenv("RABBIT_QUEUE", "gdash_climate_queue")
PUBLISH_INTERVAL = float(os.getenv("PUBLISH_INTERVAL", 5))  # segundos

def random_climate():
    temp = round(15 + random.random() * 15, 1)
    humidity = round(30 + random.random() * 60, 0)
    wind = round(2 + random.random() * 18, 1)
    return {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "temp": temp,
        "humidity": int(humidity),
        "wind": wind,
        "source": "python-producer"
    }

def main():
    params = pika.URLParameters(RABBIT_URL)
    connection = pika.BlockingConnection(params)
    channel = connection.channel()
    channel.queue_declare(queue=QUEUE_NAME, durable=True)

    print(f"[producer] conected to {RABBIT_URL}, publishing to queue '{QUEUE_NAME}' every {PUBLISH_INTERVAL}s")
    try:
        while True:
            payload = random_climate()
            body = json.dumps(payload)
            channel.basic_publish(
                exchange="",
                routing_key=QUEUE_NAME,
                body=body,
                properties=pika.BasicProperties(
                    delivery_mode=2,  # persistent
                    content_type='application/json'
                )
            )
            print(f"[producer] published: {body}")
            time.sleep(PUBLISH_INTERVAL)
    except KeyboardInterrupt:
        print("Stopping producer...")
    finally:
        connection.close()

if __name__ == "__main__":
    main()
