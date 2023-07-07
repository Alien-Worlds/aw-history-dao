import { MongoDB, QueryModel } from '@alien-worlds/api-core';

export class GetLatestCandidateQueryModel extends QueryModel {
  /**
   * @returns {GetLatestCandidateQueryModel}
   */
  public static create(
    dacId: string,
    candidate: string,
    blockTimestamp: Date
  ): GetLatestCandidateQueryModel {
    return new GetLatestCandidateQueryModel(dacId, candidate, blockTimestamp);
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

  toQueryParams(): unknown {
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
