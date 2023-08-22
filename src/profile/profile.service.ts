import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { UpdateProfileDTO } from './dto/update-profile.dto';
import { Profile } from './profile.schema';

@Injectable()
export class ProfileService {
  private readonly logger = new Logger(ProfileService.name);

  constructor(
    @InjectModel(Profile.name) private readonly profileModel: Model<Profile>,
  ) {}

  async createProfile(createProfileDto: CreateProfileDTO): Promise<{
    status: number;
    message: string;
  }> {
    const existingProfile = await this.profileModel
      .findOne({
        $or: [{ cpf: createProfileDto.cpf }, { email: createProfileDto.email }],
      })
      .exec();

    if (existingProfile) {
      throw new ConflictException('CPF or email already registered');
    }

    const profile = new this.profileModel(createProfileDto);

    try {
      await profile.save();

      return {
        status: HttpStatus.CREATED,
        message: 'Profile created successfully',
      };
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async updateProfile(updateProfileDto: UpdateProfileDTO): Promise<{
    status: number;
    message: string;
  }> {
    const existingProfile = await this.profileModel
      .findOne({
        $or: [{ cpf: updateProfileDto.cpf }, { email: updateProfileDto.email }],
      })
      .exec();

    if (!existingProfile) {
      throw new NotFoundException('Profile not found');
    }

    try {
      await this.profileModel.updateOne(
        { _id: existingProfile._id },
        updateProfileDto,
      );

      return {
        status: HttpStatus.OK,
        message: 'Profile updated successfully',
      };
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
