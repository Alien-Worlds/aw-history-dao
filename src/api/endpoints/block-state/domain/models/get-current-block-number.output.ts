import { Result } from '@alien-worlds/aw-history-starter-kit';

/**
 * Represents GetCurrentBlockNumberOutput data entity.
 *
 * @class
 */
export class GetCurrentBlockNumberOutput {
  /**
   * @private
   * @constructor
   */
  private constructor(public readonly result: Result<bigint>) {}

  public static create(result: Result<bigint>): GetCurrentBlockNumberOutput {
    return new GetCurrentBlockNumberOutput(result);
  }

  public toResponse() {
    const { result } = this;
    if (result.isFailure) {
      const {
        failure: { error },
      } = result;
      if (error) {
        return {
          status: 500,
          body: {
            status: 'FAIL',
            error: error.message,
          },
        };
      }
    }

    const { content } = result;

    const body = {
      currentBlockNumber: content.toString(),
    };

    return {
      status: 200,
      body,
    };
  }
}
