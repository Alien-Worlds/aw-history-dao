import { DataEntityType } from '@alien-worlds/aw-contract-dao-worlds/build/actions/domain/entities';
import {
  ActionTraceProcessor,
  ActionTraceProcessorModel,
  ContractAction,
  DataSourceError,
  MongoQueryBuilders,
  MongoSource,
  ProcessorSharedData,
  RepositoryImpl,
  log,
} from '@alien-worlds/aw-history-starter-kit';
import { Actions } from '@alien-worlds/aw-contract-token-worlds';
import { TokenWorldsActionMongoModel } from '@alien-worlds/aw-contract-token-worlds/build/actions/data/dtos';

type ContractData = { [key: string]: unknown };

export class TokenWorldsActionProcessor extends ActionTraceProcessor<
  ContractData,
  ProcessorSharedData
> {
  public async run(model: ActionTraceProcessorModel<ContractData>): Promise<void> {
    try {
      const {
        dependencies: { dataSource },
      } = this;

      const mongoMapper = new Actions.Mappers.TokenWorldsActionMongoMapper();
      const source = new Actions.TokenWorldsActionMongoSource(dataSource as MongoSource);
      const repository = new RepositoryImpl(
        source,
        mongoMapper,
        new MongoQueryBuilders(mongoMapper)
      );
      const taskModelMapper = new Actions.Mappers.TokenWorldsActionProcessorTaskMapper();
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
