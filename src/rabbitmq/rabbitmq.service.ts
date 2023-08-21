import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';

@Injectable()
export class RabbitMQService {
  constructor(@Inject('USER_QUEUE') private readonly client: ClientProxy) {}

  async createUser(data: CreateUserDTO): Promise<any> {
    return this.client.send('create-user', data);
  }
}
