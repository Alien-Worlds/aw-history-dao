import {
  startProcessor,
  DefaultProcessorDependencies,
} from '@alien-worlds/aw-history-starter-kit';
import path from 'path';

startProcessor(
  process.argv,
  new DefaultProcessorDependencies(),
  path.join(`${__dirname}/`, './processors'),
  path.join(__dirname, '../../dao.featured.json')
);
