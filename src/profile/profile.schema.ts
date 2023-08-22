import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum SexOptions {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NON_BINARY = 'NON_BINARY',
  OTHER = 'OTHER',
}

@Schema()
export class Profile extends Document {
  @Prop({ required: true, trim: true })
  userId: string;

  @Prop({ required: false, trim: true })
  fullname: string;

  @Prop({ required: false, trim: true })
  avatarUrl: string;

  @Prop({ required: false, enum: SexOptions })
  sex: SexOptions;

  @Prop({ required: false, trim: true })
  address: string;

  @Prop({ required: true, type: Date })
  birthDate: Date;

  @Prop({ required: true, trim: true, unique: true })
  cellphone: string;

  @Prop({
    required: true,
    unique: true,
    index: true,
    trim: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    required: true,
    trim: true,
    minlength: 11,
    maxlength: 11,
    unique: true,
    index: true,
  })
  cpf: string;

  @Prop({ required: true, trim: true })
  rg: string;

  @Prop({ required: true })
  rgEmissor: string;

  @Prop({ required: true, match: /^[A-Z]{2}$/ })
  rgEmissorUF: string;

  @Prop({ required: false, trim: true, unique: true })
  passport?: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
