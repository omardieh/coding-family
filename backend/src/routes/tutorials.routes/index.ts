import { tutorialTagRoutes } from './tutorial-tag.route';
import { tutorialRoutes } from './tutorial.route';
import { InitiateRoutes } from '@/routes';

export class InitiateTutorialsRoutes extends InitiateRoutes {
  constructor() {
    super();
    this.app.use('/', tutorialRoutes);
    this.app.use('/', tutorialTagRoutes);
  }
}
