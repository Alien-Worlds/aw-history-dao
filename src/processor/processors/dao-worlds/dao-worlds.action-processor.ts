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
import { Actions } from '@alien-worlds/dao-worlds-common';

type ContractData = { [key: string]: unknown };

export default class DaoWorldsActionProcessor extends ActionTraceProcessor<
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
        /*
        const flag = Entities.FlagCandidateProfile.fromStruct(
          <DaoWorldsContract.Actions.Types.FlagcandprofStruct>data
        );
        contractModel.data = flag;
        const flagRepository = await setupFlagRepository(mongoSource);
        flagRepository.add(flag);
        */
      } else if (contract.name === Actions.DaoWorldsActionName.Votecust) {
        /*
        const vote = Entities.VoteCustodian.fromStruct(
          <DaoWorldsContract.Actions.Types.VotecustStruct>data
        );
        contractModel.data = vote;
        
        // Storing user voting history && candidate voters history
         
        const userVotingHistoryProcessor = new UserVotingHistoryProcessor(mongoSource);
        await userVotingHistoryProcessor.run(contractModel);
        //
        const candidateVotersHistoryProcessor = new CandidateVotersHistoryProcessor(
          mongoSource
        );
        await candidateVotersHistoryProcessor.run(contractModel);
        //
        */
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
