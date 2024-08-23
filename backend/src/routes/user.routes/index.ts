import { profileRoutes } from './profile.route';
import { uploadRoutes } from './upload.route';
import { userRoutes } from './user.route';
import { InitiateRoutes } from '@/routes';

export class InitiateUserRoutes extends InitiateRoutes {
  constructor() {
    super();
    this.app.use('/', userRoutes);
    this.app.use('/', uploadRoutes);
    this.app.use('/', profileRoutes);
  }
}
