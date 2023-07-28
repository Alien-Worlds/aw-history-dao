import {
  startBootstrap,
  DefaultBootstrapDependencies,
} from '@alien-worlds/aw-history-starter-kit';
import path from 'path';

startBootstrap(
  process.argv,
  new DefaultBootstrapDependencies(),
  path.join(__dirname, '../../dao.featured.json')
);
