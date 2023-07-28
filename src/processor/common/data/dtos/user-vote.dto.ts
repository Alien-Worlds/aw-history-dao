import { MongoDB } from '@alien-worlds/aw-history-starter-kit';
import { VoteAction } from '../../domain/user-vote.enums';

export type UserVoteMongoModel = {
  _id?: MongoDB.ObjectId;
  dac_id: string;
  voter: string;
  vote_timestamp: Date;
  action: VoteAction;
  candidate: string;
  candidate_vote_power: MongoDB.Long;
  [key: string]: unknown;
};

export type UserVoteJsonModel = {
  id: string;
  dac_id: string;
  voter: string;
  vote_timestamp: Date;
  action: VoteAction;
  candidate: string;
  candidate_vote_power: string;
  [key: string]: unknown;
};
