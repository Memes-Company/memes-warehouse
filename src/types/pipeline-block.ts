import { DataSet } from './data-set';
import { PipelineConfig } from './pipeline-config';

export abstract class PipelineBlock {
  public abstract readonly name: string;
  protected dataset: DataSet;
  protected config: PipelineConfig;
  constructor(config: PipelineConfig) {
    this.config = config;
  }
  abstract async process(dataset: DataSet): Promise<DataSet>;
}
