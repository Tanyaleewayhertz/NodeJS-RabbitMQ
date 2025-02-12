const amqp = require('amqplib');
 
const publishMessage = async () => {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
 
    // Declare exchange
    const exchangeName = 'logs';
    await channel.assertExchange(exchangeName, 'fanout', { durable: false });
 
    // Publish a message
    const message = { id: 1, text: 'Hello, RabbitMQ!' };
    channel.publish(exchangeName, '', Buffer.from(JSON.stringify(message)));
 
    console.log(`[x] Sent message: ${JSON.stringify(message)}`);
 
    // Close the connection
    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.error('Error:', error);
  }
};
 
publishMessage();