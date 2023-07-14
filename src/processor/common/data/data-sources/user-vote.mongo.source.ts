import {
  MongoCollectionSource,
  MongoSource,
} from '@alien-worlds/history-tools-starter-kit';
import { UserVoteMongoModel } from '../dtos/user-vote.dto';

export class UserVoteMongoSource extends MongoCollectionSource<UserVoteMongoModel> {
  constructor(mongoSource: MongoSource) {
    super(mongoSource, 'user_votes');
  }
}
