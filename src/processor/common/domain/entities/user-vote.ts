import { Entity, UnknownObject } from '@alien-worlds/history-tools-starter-kit';
import { VoteAction } from '../user-vote.enums';
import { UserVoteJsonModel } from '../../data';

export class UserVote implements Entity {
  /**
   * @static
   * @returns {UserVote}
   */
  public static create(
    dacId: string,
    voter: string,
    voteTimestamp: Date,
    candidate: string,
    candidateVotePower: bigint,
    action: VoteAction,
    id?: string,
    rest?: UnknownObject
  ): UserVote {
    const entity = new UserVote(
      dacId,
      voter,
      voteTimestamp,
      candidate,
      candidateVotePower,
      action,
      id
    );

    entity.rest = rest;

    return entity;
  }

  /**
   * @constructor
   */
  constructor(
    public dacId: string,
    public voter: string,
    public voteTimestamp: Date,
    public candidate: string,
    public candidateVotePower: bigint,
    public action: VoteAction,
    public id?: string
  ) {}

  rest?: UnknownObject;

  toJSON(): UserVoteJsonModel {
    const {
      dacId: dac_id,
      voter,
      voteTimestamp: vote_timestamp,
      candidate,
      candidateVotePower,
      action,
      id,
    } = this;

    return {
      dac_id,
      voter,
      vote_timestamp,
      candidate,
      candidate_vote_power: candidateVotePower.toString(),
      action,
      id,
    };
  }
}
