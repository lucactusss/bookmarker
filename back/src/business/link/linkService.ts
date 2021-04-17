import { Context } from '../../infra/logging/Context';
import { CreateLinkDTO, GetLinkListOptions } from './link.models';
import LinkModel, { Link, LinkType } from '../../models/Link';
import { DocumentType } from '@typegoose/typegoose';
import OEmbedDataService from '../oEmbed/oEmbedDataService';

class LinkService {
  private oEmbedDataService = new OEmbedDataService();

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
      .limit(params.pageSize)
      .skip(params.pageSize * (params.pageNumber - 1));
  }
}

export default LinkService;
