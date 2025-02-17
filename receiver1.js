// require("dotenv").config();
// const amqp = require("amqplib");

// const RABBITMQ_URL = "amqp://localhost";
// const EXCHANGE_NAME = "logs"; // Same exchange jo producer me use kiya

// async function consumeMessage() {
//   try {
//     // RabbitMQ se connect karo
//     const connection = await amqp.connect(RABBITMQ_URL);
//     const channel = await connection.createChannel();

//     // Exchange declare karo
//     await channel.assertExchange(EXCHANGE_NAME, "fanout", { durable: false });

//     // Temporary queue banao
//     const q = await channel.assertQueue("", { exclusive: true });

//     console.log(`✅ Consumer 1 waiting for messages in queue: ${q.queue}`);

//     // Queue ko exchange se bind karo
//     await channel.bindQueue(q.queue, EXCHANGE_NAME, "");

//     // Message consume karo
//     channel.consume(
//       q.queue,
//       (msg) => {
//         if (msg.content) {
//           console.log(`📥 Consumer 1 Received: ${msg.content.toString()}`);
//         }
//       },
//       { noAck: true }
//     );
//   } catch (error) {
//     console.error("❌ Error in Consumer 1:", error);
//   }
// }

// // Consumer function call karo
// consumeMessage();






const amqp = require('amqplib');
 
const receiveMessages = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
 
    const exchangeName = 'logs';
    await channel.assertExchange(exchangeName, 'fanout', { durable: false });
 
    // Create a queue and bind it to the exchange
    const queue = await channel.assertQueue('', { exclusive: true });  //temporary queue for a particular connection
    console.log(`[x] Waiting for messages in queue: ${queue.queue}`);
    channel.bindQueue(queue.queue, exchangeName, '');  //queue k exchange se bind krna 
 
    // Consume messages
    channel.consume(queue.queue, (msg) => {  //queue se messages consume krna 
      if (msg.content) {  //ye message ka content hai jo producer ne bheja tha
        console.log(`[x] Receiver1 received: ${msg.content.toString()}`);
      }
    }, { noAck: true });  //rabbitmq ko acknowledgement bhejne ki zrurt nhi hai 
  } catch (error) {
    console.error('Error:', error);
  }
};
 
receiveMessages();  //message recieve krne ke liye ready hona
 