import { Context } from '../../infra/logging/Context';
import {
  AddKeywordToLinkOptions,
  CreateLinkDTO,
  GetLinkListOptions,
} from './link.models';
import LinkModel, { Link, LinkType } from '../../models/Link';
import { DocumentType, Ref } from '@typegoose/typegoose';
import OEmbedDataService from '../oEmbed/oEmbedDataService';
import { Keyword } from '../../models/Keyword';
import KeywordService from '../keyword/keyword.service';
import { Types } from 'mongoose';

class LinkService {
  private oEmbedDataService = new OEmbedDataService();
  private keywordService = new KeywordService();

  public async createLink(
    context: Context,
    data: CreateLinkDTO
  ): Promise<Link> {
    // Handle all metadata from the URL
    const link = await this.oEmbedDataService.handleOEmbedData(context, data);

    return await LinkModel.create({
      url: link.url,
      author: link.author,
      title: link.title,
      creationDate: new Date(),
      linkType: data.linkType as LinkType,
      width: link.width,
      height: link.height,
      duration: link.duration,
    });
  }

  public async deleteLink(context: Context, linkId: string): Promise<void> {
    const link: DocumentType<Link> | null = await LinkModel.findById(
      linkId
    ).exec();
    if (!link) {
      // TODO: Error handling here!
      throw new Error('Link does not exists !');
    }
    await link.deleteOne();
  }

  public async getLinkList(
    context: Context,
    params: GetLinkListOptions
  ): Promise<Array<Link>> {
    return await LinkModel.find()
      .populate(['keywords'])
      .limit(params.pageSize)
      .skip(params.pageSize * (params.pageNumber - 1));
  }

  public async addKeywordToLink(
    context: Context,
    params: AddKeywordToLinkOptions
  ): Promise<void> {
    const link: DocumentType<Link> | null = await LinkModel.findById(
      params.linkId
    ).exec();
    if (!link) {
      throw new Error('Link does not exists !');
    }
    let keyword: DocumentType<Keyword> | null;
    if (params.keywordId) {
      keyword = await this.keywordService.getKeywordById(
        context,
        params.keywordId
      );
      if (!keyword) {
        throw new Error('Keyword to add does not exists !');
      }
    } else if (params.color && params.label) {
      keyword = await this.keywordService.createKeyword(
        context,
        params.label,
        params.color
      );
    } else {
      throw new Error('KeywordId or color / label required !');
    }

    // Here we are supposed to have the keyword object !
    if (!Array.isArray(link.keywords)) {
      link.keywords = [keyword.id];
    } else {
      link.keywords.push(keyword.id);
    }
    await link.save();
  }

  public async removeKeywordToLink(
    context: Context,
    linkId: string,
    keywordId: string
  ): Promise<void> {
    const link: DocumentType<Link> | null = await LinkModel.findById(
      linkId
    ).exec();
    if (!link) {
      throw new Error('Link does not exists !');
    }
    const keyword = await this.keywordService.getKeywordById(
      context,
      keywordId
    );
    if (!keyword) {
      throw new Error('Keyword to add does not exists !');
    }

    link.keywords = link.keywords?.filter(
      (keyword: Ref<Keyword, Types.ObjectId | undefined>) => {
        return keyword?.toString() !== keywordId;
      }
    );
    await link.save();
  }
}

export default LinkService;
