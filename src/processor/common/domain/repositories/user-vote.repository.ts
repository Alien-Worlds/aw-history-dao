import { Repository, injectable } from '@alien-worlds/history-tools-starter-kit';
import { UserVote } from '../entities/user-vote';
import { UserVoteMongoModel } from '../../data';

/**
 * @abstract
 * @class
 */
@injectable()
export abstract class UserVoteRepository extends Repository<
  UserVote,
  UserVoteMongoModel
> {
  public static Token = 'USER_VOTE_REPOSITORY';
}
