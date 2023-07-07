import { MongoSource, Result } from '@alien-worlds/api-core';
import { DaoWorldsContract } from '@alien-worlds/eosdac-api-common';

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

export class CandidateVotersHistoryProcessor {
  constructor(private mongoSource: MongoSource) {}

  public async run(model: ContractModel): Promise<Result> {
    const { mongoSource } = this;
    const {
      blockTimestamp,
      data: { dacId, voter, newVotes },
    } = model;

    //....

    return Result.withContent(null);
  }
}
