import { inject, injectable } from '@alien-worlds/api-core';
import { GetCurrentBlockNumberOutput } from './models/get-current-block-number.output';
import { GetCurrentBlockNumberUseCase } from './use-cases/get-current-block-number.use-case';

/**
 * @class
 *
 */
@injectable()
export class BlockStateController {
  public static Token = 'BLOCK_STATE_CONTROLLER';

  constructor(
    @inject(GetCurrentBlockNumberUseCase.Token)
    private getCurrentBlockNumberUseCase: GetCurrentBlockNumberUseCase
  ) {}

  /**
   *
   * @returns {Promise<GetCurrentBlockNumberOutput>}
   */
  public async blockState(): Promise<GetCurrentBlockNumberOutput> {
    const result = await this.getCurrentBlockNumberUseCase.execute();
    
    return GetCurrentBlockNumberOutput.create(result);
  }
}
