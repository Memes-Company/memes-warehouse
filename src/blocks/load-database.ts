import fs from 'fs';
import path from 'path';

import { DataBase, LocaleAwarePullRequest, Locales, Meme, PipelineBlock, Tag } from '../types';

export class LoadDataBase extends PipelineBlock {
  private readonly localeMarker = '${locale}';
  public name: string = LoadDataBase.name;
  async process(database: DataBase): Promise<DataBase> {
    database = {
      pullRequests: {},
      memes: { en: {}, ru: {} },
      tags: { en: {}, ru: {} },
    };

    const prsPath = path.join(this.config.dbpath, 'pull-requests');
    const memesPath = path.join(this.config.dbpath, 'l10n', this.localeMarker, 'memes');
    const tagsPath = path.join(this.config.dbpath, 'l10n', this.localeMarker, 'tags');
    const dotjson = '.json';
    //TODO: refactor all this shit
    fs.readdirSync(prsPath, {
      encoding: 'utf-8',
    })
      .filter((e) => e.endsWith(dotjson))
      .map((filename) => {
        return {
          key: filename.replace(dotjson, ''),
          value: this.getJson<LocaleAwarePullRequest>(path.join(prsPath, filename)),
        };
      })
      .map((kv) => (database.pullRequests[kv.key] = { id: kv.key, ...kv.value }));

    Object.values(Locales).map((locale) => {
      this.getDirJsons(this.getLocalizedJoinedPath(memesPath, locale, ''))
        .map((filename) => this.getJson<Meme>(this.getLocalizedJoinedPath(memesPath, locale, filename)))
        .map((meme) => (database.memes[locale as Locales][meme.id] = meme));

      this.getDirJsons(this.getLocalizedJoinedPath(tagsPath, locale, ''))
        .map((filename) => {
          const tag = this.getJson<Tag>(this.getLocalizedJoinedPath(tagsPath, locale, filename));
          tag.id = filename.replace(dotjson, '');
          return tag;
        })
        .map((tag) => (database.tags[locale as Locales][tag.id] = tag));
    });
    return Promise.resolve(database);
  }

  private getJson<T>(path: string): T {
    return JSON.parse(fs.readFileSync(path, 'utf-8')) as T;
  }
  private getDirJsons(path: string): string[] {
    return fs.readdirSync(path, { encoding: 'utf-8' }).filter((e) => e.endsWith('json'));
  }

  private getLocalizedJoinedPath(basePath: string, locale: Locales, filename: string): string {
    return path.join(basePath.replace(this.localeMarker, locale), filename);
  }
}
