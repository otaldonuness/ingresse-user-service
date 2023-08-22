import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { UserService } from './user/user.service';
import { CreateUserDTO } from './user/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'create-user' })
  async createUser(@Payload() data: CreateUserDTO) {
    try {
      const result = await this.userService.createUser(data);

      return { status: result.status, message: result.message };
    } catch (error) {
      throw new RpcException({
        status: error.getStatus() || 500,
        message: error.message,
        error: error.getResponse(),
      });
    }
  }

  @MessagePattern({ cmd: 'find-user' })
  async findUser(@Payload() userId: string) {
    try {
      const user = await this.userService.findUser(userId);

      if (!user) {
        throw new RpcException({
          status: 404,
          message: 'User not found',
        });
      }

      return {
        status: 200,
        message: 'User found',
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      };
    } catch (error) {
      throw new RpcException({
        status: error.getStatus() || 500,
        message: error.message,
        error: error.getResponse(),
      });
    }
  }

  @MessagePattern({ cmd: 'find-user-by-username' })
  async findUserByUsername(@Payload() username: string) {
    try {
      const user = await this.userService.findUserByUsername(username);

      if (!user) {
        throw new RpcException({
          status: 404,
          message: 'User not found',
        });
      }

      return {
        status: 200,
        message: 'User found',
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      };
    } catch (error) {
      throw new RpcException({
        status: error.getStatus() || 500,
        message: error.message,
        error: error.getResponse(),
      });
    }
  }

  @MessagePattern({ cmd: 'update-user' })
  async updateUser(@Payload() data: { userId: string; data: CreateUserDTO }) {
    try {
      const result = await this.userService.updateUser(data.userId, data.data);

      return { status: result.status, message: result.message };
    } catch (error) {
      throw new RpcException({
        status: error.getStatus() || 500,
        message: error.message,
        error: error.getResponse(),
      });
    }
  }

  @MessagePattern({ cmd: 'delete-user' })
  async deleteUser(@Payload() userId: string) {
    try {
      const result = await this.userService.deleteUser(userId);

      return { status: result.status, message: result.message };
    } catch (error) {
      throw new RpcException({
        status: error.getStatus() || 500,
        message: error.message,
        error: error.getResponse(),
      });
    }
  }

  @MessagePattern({ cmd: 'find-all-users' })
  async findAllUsers() {
    try {
      const users = await this.userService.findAllUsers();

      return {
        status: 200,
        message: 'Users found',
        data: users.map((user) => ({
          id: user._id,
          username: user.username,
          email: user.email,
        })),
      };
    } catch (error) {
      throw new RpcException({
        status: error.getStatus() || 500,
        message: error.message,
        error: error.getResponse(),
      });
    }
  }
}
