import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user/user.service';
import { CreateUserDTO } from './user/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'create-user' })
  createUser(@Payload() data: CreateUserDTO) {
    return this.userService.createUser(data);
  }
}
