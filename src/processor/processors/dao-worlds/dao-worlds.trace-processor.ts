import { ActionTraceProcessor } from '@alien-worlds/api-history-tools';
import { ProcessorTaskModel, log } from '@alien-worlds/history-tools-common';

export class DaoWorldsTraceProcessor extends ActionTraceProcessor {
  public async run(model: ProcessorTaskModel): Promise<void> {
    log('Hello World from trace processor!');
    log(model);
  }
}
