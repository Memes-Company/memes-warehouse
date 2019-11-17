import { DataSet, Locale, LocaleAwarePullRequest, PipelineBlock } from '../types';

export class AddMemeToTags extends PipelineBlock {
  public name: string = AddMemeToTags.name;
  async process(dataset: DataSet, currentPR: LocaleAwarePullRequest): Promise<DataSet> {
    currentPR.locales.map((locale) => {
      currentPR[locale].meme.tags.forEach((tagId) => {
        const tag = this.dataset.tags[locale as Locale][tagId];
        tag.memes.push(currentPR[locale].meme.id);
      });
    });
    return Promise.resolve(dataset);
  }
}
