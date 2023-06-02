import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";
import amqp from 'amqp-connection-manager';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  await app.listen(config.get('PORT') ? parseInt(config.get('PORT')) : 3000);

  // RabbitMQ connection data. rabbitmq.env
  const user = config.get('RABBITMQ_USER')
  const password = config.get('RABBITMQ_PASSWORD');
  const host = config.get('RABBITMQ_HOST');
  const queueName = config.get('RABBITMQ_QUEUE_NAME');

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${user}:${password}@${host}`],
      queue: queueName,
      noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  });

  app.startAllMicroservices();
}
bootstrap();