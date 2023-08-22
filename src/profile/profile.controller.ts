import { Controller } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { Profile } from './profile.schema';

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @MessagePattern({ cmd: 'create-profile' })
  async createProfile(createProfileDto: CreateProfileDTO) {
    try {
      const result = await this.profileService.createProfile(createProfileDto);

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
