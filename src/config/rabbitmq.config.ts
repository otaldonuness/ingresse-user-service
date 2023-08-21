export const rabbitMqOptions = {
  urls: ['amqp://otaldonunes:Meu bebe94@rabbitmq:5672'],
  queue: 'user_queue',
  queueOptions: {
    durable: false,
  },
};
