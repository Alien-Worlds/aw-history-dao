import { startBootstrap } from '@alien-worlds/api-history-tools';
import { DefaultBootstrapDependencies } from '@alien-worlds/history-tools-starter-kit';
import path from 'path';

startBootstrap(
  process.argv,
  new DefaultBootstrapDependencies(),
  path.join(__dirname, '../../dao.featured.json')
);
