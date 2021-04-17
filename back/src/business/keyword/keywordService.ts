import { Context } from '../../infra/logging/Context';
import { DocumentType } from '@typegoose/typegoose';
import KeywordModel, { Keyword } from '../../models/Keyword';
import { GetKeywordListOptions } from './keyword.models';

const COLOR_REGEXP = new RegExp(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/);

class KeywordService {
  public async createKeyword(
    context: Context,
    label: string,
    color: string
  ): Promise<void> {
    if (!COLOR_REGEXP.test(color)) {
      // TODO: Throw error wrong color with right error type and status code !
      throw new Error('wrong color');
    }

    await KeywordModel.create({ label, color });
  }

  public async updateKeyword(
    context: Context,
    keywordId: string,
    label: string,
    color: string
  ): Promise<void> {
    if (!COLOR_REGEXP.test(color)) {
      // TODO: Throw error wrong color with right error type and status code !
      throw new Error('wrong color');
    }
    const keyword: DocumentType<Keyword> | null = await KeywordModel.findById(
      keywordId
    ).exec();
    if (!keyword) {
      // TODO: Error handling here!
      throw new Error('Keyword does not exists !');
    }
    keyword.label = label;
    keyword.color = color;
    await keyword.save();
  }

  public async deleteKeyword(
    context: Context,
    keywordId: string
  ): Promise<void> {
    const keyword: DocumentType<Keyword> | null = await KeywordModel.findById(
      keywordId
    ).exec();
    if (!keyword) {
      // TODO: Error handling here!
      throw new Error('Keyword does not exists !');
    }
    await keyword.deleteOne();
  }

  public async getKeywordList(
    context: Context,
    params: GetKeywordListOptions
  ): Promise<Array<Keyword>> {
    return await KeywordModel.find({
      label: { $regex: `.*${params.filterText}.*` },
    })
      .limit(params.pageSize)
      .skip(params.pageSize * (params.pageNumber - 1));
  }
}

export default KeywordService;
