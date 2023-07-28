import * as DaoWorldsCommon from '@alien-worlds/aw-contract-dao-worlds';
import { MongoCollectionSource, MongoSource } from '@alien-worlds/aw-history-starter-kit';

export class FlagMongoSource extends MongoCollectionSource<DaoWorldsCommon.Actions.Types.FlagcandprofMongoModel> {
  /**
   * @constructor
   * @param {MongoSource} mongoSource
   */
  constructor(mongoSource: MongoSource) {
    super(mongoSource, 'flags');
  }
}
