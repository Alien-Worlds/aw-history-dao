import { MongoSource } from '@alien-worlds/api-core';
import {
  DaoWorldsContract,
  setupUserVotingHistoryRepository,
  UserVote,
  VoteAction,
} from '@alien-worlds/eosdac-api-common';
import { setupDaoWorldsDeltaRepository } from '@alien-worlds/eosdac-api-common/build/contracts/dao-worlds/deltas/ioc';
import { GetLatestCandidateQueryModel } from './get-latest-candidate.query-model';
import { GetLatestVotesQueryModel } from './get-latest-votes.query-model';

type ContractModel = {
  blockNumber: bigint;
  blockTimestamp: Date;
  account: string;
  name: string;
  receiverSequence: bigint;
  globalSequence: bigint;
  transactionId: string;
  data: DaoWorldsContract.Actions.Entities.VoteCustodian;
};

export class UserVotingHistoryProcessor {
  constructor(private mongoSource: MongoSource) {}

  private async getCandidateVotingPower(
    dacId: string,
    candidateName: string,
    blockTimestamp: Date
  ): Promise<bigint> {
    const { mongoSource } = this;

    const deltaRepository = await setupDaoWorldsDeltaRepository(mongoSource);

    const { content, failure } = await deltaRepository.findOne(
      GetLatestCandidateQueryModel.create(dacId, candidateName, blockTimestamp)
    );
    
    if (failure) {
      return 0n;
    }
    
    const candidate = <DaoWorldsContract.Deltas.Entities.Candidate>content.data;

    return candidate.totalVotePower || 0n;
  }

  private getVotingAction(
    candidateName: string,
    prevVotedCandidates: UserVote[]
  ): VoteAction {
    let action: VoteAction;

    if (
      prevVotedCandidates.find(
        votedCandidate => votedCandidate.candidate === candidateName
      )
    ) {
      action = VoteAction.Refreshed;
    } else {
      action = VoteAction.Voted;
    }

    return action;
  }

  public async run(model: ContractModel) {
    const { mongoSource } = this;
    const {
      blockTimestamp,
      data: { dacId, voter, newVotes },
    } = model;
    const userVotingHistory = await setupUserVotingHistoryRepository(mongoSource);

    const { content: prevVotes } = await userVotingHistory.find(
      GetLatestVotesQueryModel.create(dacId, voter, blockTimestamp)
    );

    const votes = [];
    for (const candidate of newVotes) {
      const candidateVotePower = await this.getCandidateVotingPower(
        dacId,
        candidate,
        blockTimestamp
      );
      const voteAction = this.getVotingAction(candidate, prevVotes || []);
      votes.push(
        UserVote.create(
          '',
          dacId,
          voter,
          blockTimestamp,
          candidate,
          candidateVotePower,
          voteAction
        )
      );
    }

    userVotingHistory.addMany(votes);
  }
}
