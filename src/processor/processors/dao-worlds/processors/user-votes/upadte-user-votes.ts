import { parseToBigInt } from '@alien-worlds/api-core';
import { UserVoteRepositoryFactory } from '../../../../common/factories/user-vote.repository.factory';
import { Actions, Deltas } from '@alien-worlds/dao-worlds-common';
import {
  ContractAction,
  MongoQueryBuilders,
  MongoSource,
  RepositoryImpl,
  log,
} from '@alien-worlds/history-tools-starter-kit';
import { GetLatestVotesQueryBuilder } from './get-latest-votes.query-builder';
import { GetLatestCandidateQueryBuilder } from './get-latest-candidate.query-builder';
import { UserVote, VoteAction } from '../../../../common';

export const getCandidateVotingPower = async (
  deltaRepository: Deltas.DaoWorldsDeltaRepository,
  dacId: string,
  candidateName: string,
  blockTimestamp: Date
) => {
  const { content, failure } = await deltaRepository.find(
    GetLatestCandidateQueryBuilder.create(dacId, candidateName, blockTimestamp)
  );

  if (failure) {
    return 0n;
  }

  const candidate = <Deltas.Entities.Candidates>content[0].data;

  return parseToBigInt(candidate.totalVotePower) || 0n;
};

export const getVotingAction = (
  candidateName: string,
  prevVotedCandidates: UserVote[]
): VoteAction => {
  let action: VoteAction;

  if (
    prevVotedCandidates.find(votedCandidate => votedCandidate.candidate === candidateName)
  ) {
    action = VoteAction.Refreshed;
  } else {
    action = VoteAction.Voted;
  }

  return action;
};

export const updateUserVotes = async (
  mongoSource: MongoSource,
  contract: ContractAction<Actions.Entities.Votecust>
) => {
  const {
    blockTimestamp,
    data: { dacId, voter, newvotes },
  } = contract;
  const userVoteRepository = await UserVoteRepositoryFactory.create(mongoSource);
  // DAO Delta
  const daoDeltaMapper = new Deltas.Mappers.DaoWorldsDeltaMongoMapper();
  const daoDeltaRepository = new RepositoryImpl(
    new Deltas.DaoWorldsDeltaMongoSource(mongoSource),
    daoDeltaMapper,
    new MongoQueryBuilders(daoDeltaMapper)
  );
  //
  const getLatestVotesResult = await userVoteRepository.find(
    GetLatestVotesQueryBuilder.create(dacId, voter, blockTimestamp)
  );
  const prevVotes = getLatestVotesResult.isFailure ? [] : getLatestVotesResult.content;
  const votes = [];

  for (const candidate of newvotes) {
    const candidateVotePower = await getCandidateVotingPower(
      daoDeltaRepository,
      dacId,
      candidate,
      blockTimestamp
    );
    const voteAction = getVotingAction(candidate, prevVotes || []);
    votes.push(
      UserVote.create(
        dacId,
        voter,
        blockTimestamp,
        candidate,
        candidateVotePower,
        voteAction
      )
    );
  }

  if (votes.length > 0) {
    const result = await userVoteRepository.add(votes);

    if (result.isFailure) {
      log(result.failure.error);
    }
  }
};
