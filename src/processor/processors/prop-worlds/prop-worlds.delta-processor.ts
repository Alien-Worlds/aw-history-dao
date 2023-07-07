import {
  DeltaProcessor,
  DeltaProcessorModel,
  DataSourceError,
  MongoQueryBuilders,
  MongoSource,
  ProcessorSharedData,
  RepositoryImpl,
  log,
} from '@alien-worlds/history-tools-starter-kit';
import { Deltas } from '@alien-worlds/prop-worlds-common';

type ContractData = { [key: string]: unknown };

export default class PropWorldsDeltaProcessor extends DeltaProcessor<
  ContractData,
  ProcessorSharedData
> {
  public async run(model: DeltaProcessorModel<ContractData>): Promise<void> {
    try {
      const {
        dependencies: { dataSource },
      } = this;

      const mongoMapper = new Deltas.Mappers.PropWorldsDeltaMongoMapper();
      const source = new Deltas.PropWorldsDeltaMongoSource(dataSource as MongoSource);
      const repository = new RepositoryImpl(
        source,
        mongoMapper,
        new MongoQueryBuilders(mongoMapper)
      );
      const taskModelMapper = new Deltas.Mappers.PropWorldsDeltaProcessorTaskMapper();
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
