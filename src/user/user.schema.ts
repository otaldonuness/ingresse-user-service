import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    required: true,
    unique: true,
    index: true,
    minlength: 3,
    maxlength: 20,
    trim: true,
  })
  username: string;

  @Prop({
    required: true,
    unique: true,
    index: true,
    trim: true,
    lowercase: true,
  })
  email: string;

  @Prop({ required: true })
  hashedPassword: string;

  // Add other fields as needed
}

export const UserSchema = SchemaFactory.createForClass(User);
