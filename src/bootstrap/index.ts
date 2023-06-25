import { startBootstrap } from '@alien-worlds/api-history-tools';
import { DefaultBootstrapDependencies } from '@alien-worlds/history-tools-default-dependencies';
import DaoFeatured from '../../dao.featured.json';

startBootstrap(process.argv, new DefaultBootstrapDependencies(), DaoFeatured);
