import { Request } from 'express';
import { Profile } from '@/app/models/interface/profile.interface';

export interface RequestWithUser extends Request {
  user: Profile;
}
