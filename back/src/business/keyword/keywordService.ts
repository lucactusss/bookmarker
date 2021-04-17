import { Context } from '../../infra/logging/Context';
import KeywordModel, { Keyword } from '../../models/Keyword';

const COLOR_REGEXP = new RegExp(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/);

class KeywordService {
  public async createKeyword(
    context: Context,
    label: string,
    color: string
  ): Promise<Keyword> {
    if (!COLOR_REGEXP.test(color)) {
      // TODO: Throw error wrong color with right error type and status code !
      throw new Error('wrong color');
    }

    return await KeywordModel.create({ label, color });
  }
}

export default KeywordService;
