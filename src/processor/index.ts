import { startProcessor } from '@alien-worlds/api-history-tools';
import { DefaultProcessorDependencies } from '@alien-worlds/history-tools-starter-kit';
import path from 'path';

startProcessor(
  process.argv,
  new DefaultProcessorDependencies(),
  path.join(`${__dirname}/`, './processors'),
  path.join(__dirname, '../../dao.featured.json')
);
