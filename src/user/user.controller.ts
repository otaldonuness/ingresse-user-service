import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @MessagePattern({ cmd: 'create-user' })
  async createUser(createUserDto: CreateUserDTO) {
    try {
      const result = await this.userService.createUser(createUserDto);

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
  async findUser(userId: string) {
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
  async findUserByUsername(username: string) {
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

  @MessagePattern({ cmd: 'find-all-users' })
  async findAllUsers() {
    try {
      const users = await this.userService.findAllUsers();

      return {
        status: 200,
        message: 'Users found',
        data: users,
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
  async updateUser(updateUserDto: { userId: string; user: UpdateUserDTO }) {
    try {
      const result = await this.userService.updateUser(
        updateUserDto.userId,
        updateUserDto.user,
      );

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
  async deleteUser(userId: string) {
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
}
