import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { UserRequest } from './interface/user-request.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private readonly saltRounds = 12;

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  private async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, this.saltRounds);
    } catch (error) {
      throw new InternalServerErrorException('Failed to hash password');
    }
  }

  async createUser(
    data: CreateUserDTO,
  ): Promise<{ status: number; message: string }> {
    const existingUser = await this.userModel
      .findOne({ $or: [{ username: data.username }, { email: data.email }] })
      .exec();

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    const hashedPassword = await this.hashPassword(data.password);

    const user = new this.userModel({
      ...data,
      hashedPassword,
    });

    try {
      await user.save();
      return {
        status: HttpStatus.CREATED,
        message: 'User created successfully',
      };
    } catch (error) {
      this.logger.error({ message: 'Failed to create user', error });
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findUser(userId: string): Promise<User | null> {
    try {
      const user = await this.userModel.findById(userId).exec();

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve user');
    }
  }

  async findUserByUsername(username: string): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ username }).exec();

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve user');
    }
  }

  async findAllUsers(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve users');
    }
  }

  async updateUser(
    userId: string,
    data: CreateUserDTO,
  ): Promise<{ status: number; message: string }> {
    try {
      const user = await this.findUser(userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.userModel.findByIdAndUpdate(userId, data).exec();

      return { status: HttpStatus.OK, message: 'User updated successfully' };
    } catch (error) {
      this.logger.error({ message: 'Failed to update user', error });
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async deleteUser(
    userId: string,
  ): Promise<{ status: number; message: string }> {
    try {
      const user = await this.findUser(userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.userModel.findByIdAndDelete(userId).exec();

      return { status: HttpStatus.OK, message: 'User deleted successfully' };
    } catch (error) {
      this.logger.error({ message: 'Failed to delete user', error });
      throw new InternalServerErrorException('Failed to delete user');
    }
  }

  async getMe(req: UserRequest): Promise<User | null> {
    try {
      // Extract user ID from request (this depends on your auth implementation)
      const userId = req?.user.id;

      if (!userId) {
        throw new NotFoundException('User not found');
      }

      return this.findUser(userId);
    } catch (error) {
      this.logger.error({ message: 'Failed to retrieve current user', error });
      throw new InternalServerErrorException('Failed to retrieve current user');
    }
  }
}
