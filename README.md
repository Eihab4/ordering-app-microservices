# Ordering Application

## Overview

This project is a **microservices-based ordering application** built using **NestJS**, **RabbitMQ**, **MongoDB**, and **Docker**. The system follows an **event-driven architecture**, ensuring efficient communication between services.

### System Components
- **Orders Service**: Handles order creation and publishes messages to RabbitMQ.
- **Billing Service**: Listens for messages from the Orders service, processes billing, and acknowledges messages.
- **RabbitMQ**: Manages message queuing between services.
- **MongoDB**: Stores data for each service.

---

##  System Flow with RabbitMQ

###  High-Level Flow

1. **User Interaction**  
   - A user sends a `POST /orders` request to the Orders service with order details.

2. **Orders Service**  
   - Receives the request and creates an order.
   - Publishes an `order_created` message to RabbitMQ.

3. **RabbitMQ**  
   - Routes the `order_created` message to the **billing queue**.

4. **Billing Service**  
   - Listens for messages on the **billing queue**.
   - Processes the order billing and acknowledges the message.

5. **Future Enhancement**  
   - In the future, the **billing queue should transfer data to an authentication service** using RabbitMQ.

---

## Why RabbitMQ?

- **Asynchronous Communication**: Prevents blocking and improves system responsiveness.
- **Decoupling Services**: Allows services to operate independently.
- **Scalability**: Multiple instances of services can consume messages efficiently.


---

##  How to run the Application?

### 1) Clone the Repository
```bash
git clone https://github.com/Eihab4/ordering-app-microservices.git

cd ordering-app
```
### 2) Ensure that environment variables are configured properly in the .env files inside each service

### 3) Start the system with Docker
```bash
docker-compose up --build -d
```

---

##  Future Improvements

### 1) Transfer Billing Queue to Authentication Service The billing queue should transfer data to the authentication service via RabbitMQ to enhance security and ensure user validation during the billing process.

### 2) Implement Dead Letter Queues for Failed Messages ,Messages that cannot be processed should be routed to a Dead Letter Queue (DLQ) to prevent message loss and allow debugging.

---

## Contributing

We welcome contributions to enhance the Application! Please follow these steps to contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request.


   

---

Thank you for checking out our small ordering  application , We hope you find it useful and informative. If you have any questions or feedback, feel free to reach out!