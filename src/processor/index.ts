import { startProcessor } from '@alien-worlds/api-history-tools';
import { DefaultProcessorDependencies } from '@alien-worlds/history-tools-default-dependencies';
import path from 'path';
import DaoFeatured from '../../dao.featured.json';

startProcessor(
  process.argv,
  new DefaultProcessorDependencies(),
  path.join(`${__dirname}/`, './processors'),
  DaoFeatured
);
