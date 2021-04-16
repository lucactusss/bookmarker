import { Context } from '../../infra/logging/Context';
import { CreateLinkDTO } from './models';
import LinkModel, { Link, LinkType } from '../../models/Link';
import got from 'got';

class LinkService {
  public async createLink(
    context: Context,
    data: CreateLinkDTO
  ): Promise<Link> {
    // Handle all metadata from the URL
    const link = await this.handleOEmbedData(context, data);

    return await LinkModel.create({
      url: link.url,
      author: link.author,
      title: link.title,
      creationDate: new Date(),
      linkType: data.linkType as LinkType,
      width: link.width,
      height: link.height,
    });
  }

  private async handleOEmbedData(
    context: Context,
    data: CreateLinkDTO
  ): Promise<Link> {
    const link = new Link();
    link.url = data.url;

    if (data.linkType === LinkType.PHOTO) {
      const finalUrl = `http://www.flickr.com/services/oembed/?format=json&url=${encodeURI(
        link.url
      )}`;

      const result = await got(finalUrl, {
        responseType: 'json',
        resolveBodyOnly: true,
      });

      if (result) {
        link.author = (result as any).author_name;
        link.title = (result as any).title;
        link.height = (result as any).height;
        link.width = (result as any).width;
      } else {
        // TODO: Handle error
      }
    }
    return link;
  }
}

export default LinkService;
