import { Container } from '@alien-worlds/aw-history-starter-kit';
import { BlockStateController, GetCurrentBlockNumberRoute } from './block-state';

export const buildRoutes = (container: Container) => {
  const blockStateController = container.get<BlockStateController>(
    BlockStateController.Token
  );

  return [
    GetCurrentBlockNumberRoute.create(
      blockStateController.blockState.bind(blockStateController)
    ),
  ];
};
