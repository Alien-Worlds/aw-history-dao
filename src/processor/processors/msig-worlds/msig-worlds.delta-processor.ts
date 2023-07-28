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
import { Deltas } from '@alien-worlds/aw-contract-msig-worlds';

type ContractData = { [key: string]: unknown };

export class MsigWorldsDeltaProcessor extends DeltaProcessor<
  ContractData,
  ProcessorSharedData
> {
  public async run(model: DeltaProcessorModel<ContractData>): Promise<void> {
    try {
      const {
        dependencies: { dataSource },
      } = this;

      const mongoMapper = new Deltas.Mappers.MsigWorldsDeltaMongoMapper();
      const source = new Deltas.MsigWorldsDeltaMongoSource(dataSource as MongoSource);
      const repository = new RepositoryImpl(
        source,
        mongoMapper,
        new MongoQueryBuilders(mongoMapper)
      );
      const taskModelMapper = new Deltas.Mappers.MsigWorldsDeltaProcessorTaskMapper();
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
