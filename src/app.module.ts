import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from './database/mongoose.module';

@Module({
  imports: [RabbitMQModule, UserModule, MongooseModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
