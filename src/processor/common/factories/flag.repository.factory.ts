import { Actions } from '@alien-worlds/aw-contract-dao-worlds';
import {
  MongoConfig,
  MongoQueryBuilders,
  MongoSource,
  RepositoryImpl,
} from '@alien-worlds/aw-history-starter-kit';
import { FlagRepository } from '../domain/repositories/flag.repository';
import { FlagMongoSource } from '../data/data-sources/flag.mongo.source';

export class FlagRepositoryFactory {
  public static async create(mongo: MongoSource | MongoConfig): Promise<FlagRepository> {
    let mongoSource: MongoSource;
    if (mongo instanceof MongoSource) {
      mongoSource = mongo;
    } else {
      mongoSource = await MongoSource.create(mongo);
    }

    const repository = new RepositoryImpl(
      new FlagMongoSource(mongoSource),
      new Actions.Mappers.FlagcandprofMongoMapper(),
      new MongoQueryBuilders()
    );

    return repository;
  }
}
