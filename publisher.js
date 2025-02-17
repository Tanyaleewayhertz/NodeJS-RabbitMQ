const amqp = require('amqplib');  //library jo rabbitmq se communicate krne mei help krti hai
 
const publishMessage = async () => {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();  //ek communication channel create krna 
 
    // Declare exchange
    const exchangeName = 'logs';  //exchange ka name
    await channel.assertExchange(exchangeName, 'fanout', { durable: false });  //durable ka mtlb crash ke tym pr messages ko store nhi kiya jayega
 
    // Publish a message
    const message = { id: 1, text: 'Hello, RabbitMQ!' };
    channel.publish(exchangeName, '', Buffer.from(JSON.stringify(message))); //' 'iska mtlb routing key hum fanout mei nhi dete kyunki sbhi users ke paas jata hai
  
    console.log(`[x] Sent message: ${JSON.stringify(message)}`);  //json se buffer mei pack krta hai
 
    // Close the connection
    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);  //500ms ke baad connection close krdeta hai
  } catch (error) {
    console.error('Error:', error);
  }
};
 
publishMessage();