import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
  Logger,
} from '@nestjs/common';
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
      this.logger.error({
        message: 'Failed to hash password',
        error,
      });
      throw new InternalServerErrorException('Failed to hash password');
    }
  }

  async createUser(data: CreateUserDTO): Promise<string> {
    const hashedPassword = await this.hashPassword(data.password);

    const user = new this.userModel({
      ...data,
      password: hashedPassword,
    });

    try {
      await user.save();
      return 'User created successfully';
    } catch (error) {
      this.logger.error({
        message: 'Failed to create user',
        error,
      });
      if (error.code === 11000) {
        throw new ConflictException('Username or email already exists');
      }
      throw new InternalServerErrorException({
        message: 'Something went wrong',
        error,
      });
    }
  }
}
