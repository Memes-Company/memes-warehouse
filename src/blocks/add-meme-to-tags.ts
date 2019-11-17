import { DataSet, Locale, LocaleAwarePullRequest, PipelineBlock } from '../types';

export class AddMemeToTags extends PipelineBlock {
  public name: string;
  async process(dataset: DataSet, currentPullRequest: LocaleAwarePullRequest): Promise<DataSet> {
    currentPullRequest.locales.map((locale) => {
      currentPullRequest[locale].meme.tags.forEach((tagId) => {
        const tag = this.dataset.tags[locale as Locale][tagId];
        tag.memes = tag.memes || [];
        tag.memes.push(currentPullRequest[locale].meme.id);
      });
    });
    return Promise.resolve(dataset);
  }
}
