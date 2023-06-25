import { startReader } from '@alien-worlds/api-history-tools';
import { DefaultReaderDependencies } from '@alien-worlds/history-tools-default-dependencies';

startReader(process.argv, new DefaultReaderDependencies());
