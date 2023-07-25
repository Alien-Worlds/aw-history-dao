import {
  BlockState,
  Result,
  UseCase,
  inject,
  injectable,
} from '@alien-worlds/history-tools-starter-kit';
import { BlockStateToken } from '../../../ioc.config';

@injectable()
export class GetCurrentBlockNumberUseCase implements UseCase<bigint> {
  public static Token = 'GET_CURRENT_BLOCK_NUMBER_USE_CASE';

  constructor(
    @inject(BlockStateToken)
    private blockState: BlockState
  ) {}

  public async execute(): Promise<Result<bigint>> {
    return this.blockState.getBlockNumber();
  }
}
