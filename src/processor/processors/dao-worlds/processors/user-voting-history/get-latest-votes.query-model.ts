import { MongoDB, QueryModel } from '@alien-worlds/api-core';

export class GetLatestVotesQueryModel extends QueryModel {
  /**
   * @returns {VotingHistoryQueryModel}
   */
  public static create(
    dacId: string,
    voter: string,
    blockTimestamp: Date
  ): GetLatestVotesQueryModel {
    return new GetLatestVotesQueryModel(dacId, voter, blockTimestamp);
  }

  /**
   * @constructor
   * @private
   */
  private constructor(
    public readonly dacId: string,
    public readonly voter: string,
    public readonly blockTimestamp: Date
  ) {
    super();
  }

  public toQueryParams(): unknown {
    const { dacId, voter, blockTimestamp } = this;
    const filter = {
      dac_id: dacId,
      voter,
      block_timestamp: {
        $lt: blockTimestamp,
      },
    };

    const options: MongoDB.FindOptions = {
      sort: { block_timestamp: -1 },
      limit : 2
    };

    return { filter, options };
  }
}
