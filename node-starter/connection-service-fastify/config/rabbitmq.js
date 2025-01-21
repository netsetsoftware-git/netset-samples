const amqp = require('amqplib');

let channel = null;

const RABBITMQ_URL = 'amqp://localhost';
const QUEUE = 'notify_connections_q';

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    channel.assertQueue(QUEUE, {
        durable: false
    });

    
  } catch (err) {
    console.error('Error connecting to RabbitMQ:', err);
    process.exit(1);
  }
}


function publishMessage(message) {
  if (!channel) {
    throw new Error('RabbitMQ channel is not initialized');
  }

  const msgBuffer = Buffer.from(JSON.stringify(message));
  channel.sendToQueue(QUEUE, msgBuffer);
  console.log(" [x] Sent %s", message);
}

module.exports = {
  connectRabbitMQ,
  publishMessage,
};
