import * as DaoWorldsCommon from '@alien-worlds/dao-worlds-common';
import {
  MongoCollectionSource,
  MongoSource,
} from '@alien-worlds/history-tools-starter-kit';

export class FlagMongoSource extends MongoCollectionSource<DaoWorldsCommon.Actions.Types.FlagcandprofMongoModel> {
  /**
   * @constructor
   * @param {MongoSource} mongoSource
   */
  constructor(mongoSource: MongoSource) {
    super(mongoSource, 'flags');
  }
}
