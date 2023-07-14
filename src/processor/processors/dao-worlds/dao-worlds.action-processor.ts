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
} from '@alien-worlds/history-tools-starter-kit';
import { Actions } from '@alien-worlds/dao-worlds-common';
import { FlagRepositoryFactory } from '../../common';
import { updateUserVotes } from './processors/user-votes/upadte-user-votes';

type ContractData = { [key: string]: unknown };

export class DaoWorldsActionProcessor extends ActionTraceProcessor<
  ContractData,
  ProcessorSharedData
> {
  public async run(model: ActionTraceProcessorModel<ContractData>): Promise<void> {
    try {
      const {
        dependencies: { dataSource },
      } = this;

      const mongoMapper = new Actions.Mappers.DaoWorldsActionMongoMapper();
      const source = new Actions.DaoWorldsActionMongoSource(dataSource as MongoSource);
      const repository = new RepositoryImpl(
        source,
        mongoMapper,
        new MongoQueryBuilders(mongoMapper)
      );
      const taskModelMapper = new Actions.Mappers.DaoWorldsActionProcessorTaskMapper();
      const contract = taskModelMapper.toEntity(model);

      if (contract.name === Actions.DaoWorldsActionName.Flagcandprof) {
        //
        const flag = contract.data as Actions.Entities.Flagcandprof;
        const flagRepository = await FlagRepositoryFactory.create(
          dataSource as MongoSource
        );
        flagRepository.add([flag]);
        //
      } else if (contract.name === Actions.DaoWorldsActionName.Votecust) {
        //
        await updateUserVotes(
          dataSource as MongoSource,
          contract as ContractAction<Actions.Entities.Votecust>
        );
        //
      }

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
