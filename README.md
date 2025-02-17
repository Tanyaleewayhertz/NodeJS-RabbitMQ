RabbitMQ ek message broker hai jo messages ko ek jagah se doosri jagah bhejta hai. Iska kaam hota hai ki jo message ek jagah (sender) se bheja jaata hai, wo correct receiver tak pahunch sake, chahe receiver ready ho ya nahi.

1️⃣ Producer:
Producer wo application ya system hota hai jo message bhejta hai. Jaise producer.js file me message bheja jaata hai.

2️⃣ Exchange:
Exchange wo mechanism hai jo messages ko route karta hai. Jab producer message bhejta hai, wo exchange ke through jaata hai.
Types of exchanges:

fanout: Sabhi subscribers ko message bhejna.
direct: Specific subscribers ko message bhejna.
topic: Pattern-based message delivery.
3️⃣ Queue:
Queue ek temporary storage hoti hai jahan pe messages ko store kiya jaata hai jab tak consumers (receivers) unko read na kar lein.

Jab producer message bhejta hai, wo pehle exchange ke paas jaata hai, phir queue me store ho jata hai.
4️⃣ Consumer:
Consumer wo application hai jo message receive karta hai. Consumers ko queues se connect kiya jaata hai.

Docker container mei Rabbitmq run ke liye:
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
Port 5672: Yeh port RabbitMQ server ke liye hota hai (message exchange ke liye).
Port 15672: Yeh port RabbitMQ ka Management Console (GUI) ke liye hota hai, jahan se tu queues aur exchanges ko manage kar sakta hai.