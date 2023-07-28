import {
  MongoDB,
  MongoMapper,
  UnknownObject,
} from '@alien-worlds/aw-history-starter-kit';
import { UserVote } from '../../domain/entities/user-vote';
import { UserVoteMongoModel } from '../dtos/user-vote.dto';
import { VoteAction } from '../../domain/user-vote.enums';

// Mongo Mappers
export class UserVoteMongoMapper extends MongoMapper<UserVote, UserVoteMongoModel> {
  constructor() {
    super();

    this.mappingFromEntity.set('rest', {
      key: 'rest',
      mapper: (value: UnknownObject) => value,
    });

    this.mappingFromEntity.set('dacId', {
      key: 'dac_id',
      mapper: (value: string) => value,
    });

    this.mappingFromEntity.set('voter', {
      key: 'voter',
      mapper: (value: string) => value,
    });

    this.mappingFromEntity.set('voteTimestamp', {
      key: 'vote_timestamp',
      mapper: (value: Date) => value,
    });

    this.mappingFromEntity.set('candidate', {
      key: 'candidate',
      mapper: (value: string) => value,
    });

    this.mappingFromEntity.set('candidateVotePower', {
      key: 'candidate_vote_power',
      mapper: (value: bigint) => MongoDB.Long.fromBigInt(value),
    });

    this.mappingFromEntity.set('action', {
      key: 'action',
      mapper: (value: VoteAction) => value,
    });
  }

  public toEntity(mongoModel: UserVoteMongoModel): UserVote {
    const {
      dac_id,
      voter,
      vote_timestamp,
      action,
      candidate,
      candidate_vote_power,
      _id,
      ...rest
    } = mongoModel;

    return UserVote.create(
      dac_id ?? '',
      voter ?? '',
      vote_timestamp ?? new Date(0),
      candidate ?? '',
      candidate_vote_power.toBigInt() ?? 0n,
      action ?? VoteAction.Voted,
      _id instanceof MongoDB.ObjectId ? _id.toString() : undefined,
      rest
    );
  }
}
