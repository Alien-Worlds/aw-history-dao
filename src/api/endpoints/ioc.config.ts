import {
  Container,
  BlockState,
  BlockStateFactory,
  MongoSource,
  ApiConfig,
  MongoConfig,
} from '@alien-worlds/aw-history-starter-kit';
import { BlockStateController } from './block-state/domain/block-state.controller';
import { GetCurrentBlockNumberUseCase } from './block-state/domain/use-cases/get-current-block-number.use-case';

export const BlockStateToken = 'BLOCK_STATE';

export const setupIoc = async (config: ApiConfig, container: Container) => {
  const mongoSource = await MongoSource.create(config.database as MongoConfig);
  const blockState = await BlockStateFactory.create(mongoSource);
  container.bind<BlockState>(BlockStateToken).toConstantValue(blockState);

  container
    .bind<GetCurrentBlockNumberUseCase>(GetCurrentBlockNumberUseCase.Token)
    .to(GetCurrentBlockNumberUseCase);
  container
    .bind<BlockStateController>(BlockStateController.Token)
    .to(BlockStateController);
};
