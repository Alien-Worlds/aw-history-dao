import {
  MongoConfig,
  MongoQueryBuilders,
  MongoSource,
  RepositoryImpl,
} from '@alien-worlds/aw-history-starter-kit';

import { UserVoteRepository } from '../domain';
import { UserVoteMongoMapper, UserVoteMongoSource } from '../data';

export class UserVoteRepositoryFactory {
  public static async create(
    mongo: MongoSource | MongoConfig
  ): Promise<UserVoteRepository> {
    let mongoSource: MongoSource;
    if (mongo instanceof MongoSource) {
      mongoSource = mongo;
    } else {
      mongoSource = await MongoSource.create(mongo);
    }

    const repository = new RepositoryImpl(
      new UserVoteMongoSource(mongoSource),
      new UserVoteMongoMapper(),
      new MongoQueryBuilders()
    );

    return repository;
  }
}
