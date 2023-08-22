import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDTO } from './create-profile.dto';

export class UpdateProfileDTO extends PartialType(CreateProfileDTO) {}
