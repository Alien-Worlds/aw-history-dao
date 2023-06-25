import { DeltaProcessor } from '@alien-worlds/api-history-tools';
import { ProcessorTaskModel, log } from '@alien-worlds/history-tools-common';

export class DaoWorldsDeltaProcessor extends DeltaProcessor<unknown> {
  public async run(model: ProcessorTaskModel): Promise<void> {
    log('Hello World from delta processor!');
    log(model);
  }
}
