import { DataBase, Locales, LocaleAwarePullRequest, PipelineBlock } from '../types';

export class AddMemeToTags extends PipelineBlock {
  public name: string = AddMemeToTags.name;
  async process(database: DataBase, currentPR: LocaleAwarePullRequest): Promise<DataBase> {
    currentPR.locales.map((locale) => {
      currentPR[locale].meme.tags.forEach((tagId) => {
        const tag = database.tags[locale as Locales][tagId];
        tag.memes.push(currentPR[locale].meme.id);
      });
    });
    return Promise.resolve(database);
  }
}
