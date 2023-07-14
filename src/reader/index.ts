import {
  startReader,
  DefaultReaderDependencies,
} from '@alien-worlds/history-tools-starter-kit';

startReader(process.argv, new DefaultReaderDependencies());
