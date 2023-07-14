import { MongoDB, Query, QueryBuilder } from '@alien-worlds/history-tools-starter-kit';

export class GetLatestCandidateQueryBuilder extends QueryBuilder {
  /**
   * @returns {GetLatestCandidateQueryModel}
   */
  public static create(
    dacId: string,
    candidate: string,
    blockTimestamp: Date
  ): GetLatestCandidateQueryBuilder {
    return new GetLatestCandidateQueryBuilder(dacId, candidate, blockTimestamp);
  }

  /**
   * @constructor
   * @private
   */
  private constructor(
    public readonly dacId: string,
    public readonly candidate: string,
    public readonly blockTimestamp: Date
  ) {
    super();
  }

  build(): Query {
    const { dacId, candidate, blockTimestamp } = this;
    const filter = {
      scope: dacId,
      table: 'candidates',
      'data.candidate_name': candidate,
      block_timestamp: {
        $lt: blockTimestamp,
      },
    };

    const options: MongoDB.FindOptions = {
      sort: { block_timestamp: -1 },
    };

    return { filter, options };
  }
}
