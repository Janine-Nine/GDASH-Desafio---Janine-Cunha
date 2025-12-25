// node-consumer/index.js
require('dotenv').config();
const amqp = require('amqplib');
const axios = require('axios');

const RABBIT = process.env.RABBIT_URL || 'amqp://guest:guest@localhost:5672';
const QUEUE = process.env.QUEUE || 'gdash_climate_queue';
const NEST_URL = process.env.NEST_URL || 'http://localhost:3000/climate';

async function main() {
  const conn = await amqp.connect(RABBIT);
  const ch = await conn.createChannel();
  await ch.assertQueue(QUEUE, { durable: true });
  console.log(`[node-consumer] Listening on ${QUEUE} - forwarding to ${NEST_URL}`);

  ch.consume(QUEUE, async (msg) => {
    if (!msg) return;
    const content = msg.content.toString();
    console.log(`[node-consumer] Received: ${content}`);

    try {
      const json = JSON.parse(content);
      // POST to NestJS
      await axios.post(NEST_URL, json, { timeout: 5000 });
      console.log(`[node-consumer] Forwarded to Nest: ${NEST_URL}`);
      ch.ack(msg);
    } catch (err) {
      console.error("[node-consumer] Error forwarding:", err.message || err);
      // Nack and requeue or dead-letter in real setups.
      ch.nack(msg, false, false); // drop message to avoid infinite loop here
    }
  }, { noAck: false });
}

main().catch(err => {
  console.error("Consumer failed:", err);
  process.exit(1);
});
