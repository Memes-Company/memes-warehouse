import { DataBase } from './data-set';
import { LocaleAwarePullRequest } from './locale-aware-pull-reques';
import { PipelineConfig } from './pipeline-config';

export abstract class PipelineBlock {
  public abstract readonly name: string;
  protected config: PipelineConfig;
  constructor(config: PipelineConfig) {
    this.config = config;
  }

  //oh, yep, we need to process every PR separately to create separate commits
  abstract async process(database: DataBase, currentPR: LocaleAwarePullRequest): Promise<DataBase>;
}
