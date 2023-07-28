import {
  DefaultApiDependencies,
  log,
  startApi,
} from '@alien-worlds/aw-history-starter-kit';
import { setupIoc } from './endpoints';
import { buildRoutes } from './endpoints/routes';

const dependencies = new DefaultApiDependencies();
dependencies.initialize(setupIoc, buildRoutes);

startApi(dependencies).catch(log);
