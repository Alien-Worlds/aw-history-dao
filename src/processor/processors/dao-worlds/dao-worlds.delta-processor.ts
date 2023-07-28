import {
  DeltaProcessor,
  DeltaProcessorModel,
  DataSourceError,
  MongoQueryBuilders,
  MongoSource,
  ProcessorSharedData,
  RepositoryImpl,
  log,
} from '@alien-worlds/aw-history-starter-kit';
import { Deltas } from '@alien-worlds/aw-contract-dao-worlds';

type ContractData = { [key: string]: unknown };

export class DaoWorldsDeltaProcessor extends DeltaProcessor<
  ContractData,
  ProcessorSharedData
> {
  public async run(model: DeltaProcessorModel<ContractData>): Promise<void> {
    try {
      const {
        dependencies: { dataSource },
      } = this;

      const mongoMapper = new Deltas.Mappers.DaoWorldsDeltaMongoMapper();
      const source = new Deltas.DaoWorldsDeltaMongoSource(dataSource as MongoSource);
      const repository = new RepositoryImpl(
        source,
        mongoMapper,
        new MongoQueryBuilders(mongoMapper)
      );
      const taskModelMapper = new Deltas.Mappers.DaoWorldsDeltaProcessorTaskMapper();
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
