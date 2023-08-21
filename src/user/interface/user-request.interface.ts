import { Request } from 'express';

export interface UserRequest extends Request {
  user?: {
    id: string;
    // other properties you might have on the user object
  };
}
