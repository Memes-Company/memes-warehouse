import fs from 'fs';
import path from 'path';
import { DataSet, Locale, LocaleAwarePullRequest, Meme, PipelineBlock, Tag } from '../types';

export class LoadDataSet extends PipelineBlock {
  public name: string = LoadDataSet.name;
  process(): Promise<DataSet> {
    this.dataset = {
      PullRequests: {},
      Memes: { en: {}, ru: {} },
      Tags: { en: {}, ru: {} },
    };

    const prsPath = path.join(this.config.dbpath, 'pull-requests');
    const localeMarker = '${locale}';
    const memesPath = path.join(this.config.dbpath, 'l10n', localeMarker, 'memes');
    const tagsPath = path.join(this.config.dbpath, 'l10n', localeMarker, 'tags');
    const dotjson = '.json';

    fs.readdirSync(prsPath, {
      encoding: 'utf-8',
    })
      .filter((e) => e.endsWith(dotjson))
      .map((filename) => {
        return {
          key: filename.replace(dotjson, ''),
          value: JSON.parse(fs.readFileSync(path.join(prsPath, filename), 'utf-8')) as LocaleAwarePullRequest,
        };
      })
      .map((kv) => (this.dataset[kv.key] = kv.value));

    Object.keys(Locale).map((locale) => {
      fs.readdirSync(memesPath.replace(localeMarker, locale), { encoding: 'utf-8' })
        .filter((e) => e.endsWith(dotjson))
        .map(
          (filename) =>
            JSON.parse(fs.readFileSync(path.join(memesPath.replace(localeMarker, locale), filename), 'utf-8')) as Meme,
        )
        .map((meme) => (this.dataset.Memes[locale as Locale][meme.id] = meme));

      fs.readdirSync(tagsPath.replace(localeMarker, locale), { encoding: 'utf-8' })
        .filter((e) => e.endsWith(dotjson))
        .map((filename) => {
          const tag = JSON.parse(
            fs.readFileSync(path.join(tagsPath.replace(localeMarker, locale), filename), 'utf-8'),
          ) as Tag;
          tag.id = filename.replace(dotjson, '');
          return tag;
        })
        .map((tag) => (this.dataset.Tags[locale as Locale][tag.id] = tag));
    });
    return Promise.resolve(this.dataset);
  }
}
