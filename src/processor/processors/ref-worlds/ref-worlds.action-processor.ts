import {
  ActionTraceProcessor,
  ActionTraceProcessorModel,
  DataSourceError,
  MongoQueryBuilders,
  MongoSource,
  ProcessorSharedData,
  RepositoryImpl,
  log,
} from '@alien-worlds/history-tools-starter-kit';
import { Actions } from '@alien-worlds/ref-worlds-common';

type ContractData = { [key: string]: unknown };

export default class RefWorldsActionProcessor extends ActionTraceProcessor<
  ContractData,
  ProcessorSharedData
> {
  public async run(model: ActionTraceProcessorModel<ContractData>): Promise<void> {
    try {
      const {
        dependencies: { dataSource },
      } = this;

      const mongoMapper = new Actions.Mappers.RefWorldsActionMongoMapper();
      const source = new Actions.RefWorldsActionMongoSource(dataSource as MongoSource);
      const repository = new RepositoryImpl(
        source,
        mongoMapper,
        new MongoQueryBuilders(mongoMapper)
      );
      const taskModelMapper = new Actions.Mappers.RefWorldsActionProcessorTaskMapper();
      const contract = taskModelMapper.toEntity(model);
      const result = await repository.add([contract]);

      if (result.isFailure) {
        const {
          failure: { error },
        } = result;
        if ((<DataSourceError>error).isDuplicateError) {
          log(`Resolving a task containing duplicate documents: ${error.message}`);
          this.resolve(contract);
        } else {
          this.reject(error);
        }
      } else {
        this.resolve(contract);
      }
    } catch (error) {
      this.reject(error);
    }
  }
}
