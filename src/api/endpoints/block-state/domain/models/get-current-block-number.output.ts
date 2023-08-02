import { IO, Result, UnknownObject } from '@alien-worlds/aw-history-starter-kit';

/**
 * Represents GetCurrentBlockNumberOutput data entity.
 *
 * @class
 */
export class GetCurrentBlockNumberOutput implements IO {
  public static create(result: Result<bigint>): GetCurrentBlockNumberOutput {
    return new GetCurrentBlockNumberOutput(result);
  }

  constructor(public readonly result: Result<bigint>) { }

  public toJSON(): UnknownObject {
    if (!this.result || this.result.isFailure) {
      return {};
    }

    return {
      currentBlockNumber: this.result.content.toString(),
    };
  }
}
