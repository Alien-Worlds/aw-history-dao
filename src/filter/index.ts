import { startFilter } from '@alien-worlds/api-history-tools';
import { DefaultFilterDependencies } from '@alien-worlds/history-tools-default-dependencies';
import DaoFeatured from '../../dao.featured.json';

startFilter(process.argv, new DefaultFilterDependencies(), DaoFeatured);
