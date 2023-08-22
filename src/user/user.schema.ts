import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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

  @Prop({ required: true, trim: true })
  hashedPassword: string;

  @Prop({ type: Types.ObjectId, ref: 'Profile' })
  profile: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
