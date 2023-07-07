import { startReader } from '@alien-worlds/api-history-tools';
import { DefaultReaderDependencies } from '@alien-worlds/history-tools-starter-kit';

startReader(process.argv, new DefaultReaderDependencies());
