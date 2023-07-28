import {
  startReader,
  DefaultReaderDependencies,
} from '@alien-worlds/aw-history-starter-kit';

startReader(process.argv, new DefaultReaderDependencies());
