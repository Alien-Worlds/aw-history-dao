import { MongoDB, Query, QueryBuilder } from '@alien-worlds/history-tools-starter-kit';

export class GetLatestVotesQueryBuilder extends QueryBuilder {
  /**
   * @returns {VotingHistoryQueryModel}
   */
  public static create(
    dacId: string,
    voter: string,
    voteTimestamp: Date
  ): GetLatestVotesQueryBuilder {
    return new GetLatestVotesQueryBuilder(dacId, voter, voteTimestamp);
  }

  /**
   * @constructor
   * @private
   */
  private constructor(
    public readonly dacId: string,
    public readonly voter: string,
    public readonly voteTimestamp: Date
  ) {
    super();
  }

  public build(): Query {
    const { dacId, voter, voteTimestamp } = this;
    const filter = {
      dac_id: dacId,
      voter,
      vote_timestamp: {
        $lt: voteTimestamp,
      },
    };

    const options: MongoDB.FindOptions = {
      sort: { vote_timestamp: -1 },
      limit: 2,
    };

    return { filter, options };
  }
}
