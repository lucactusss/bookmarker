import got, { HTTPError } from 'got';
import { Context } from '../../infra/logging/Context';
import { CreateLinkDTO } from '../link/link.models';
import { Link, LinkType } from '../../models/Link';
import { OEmbedLink, OEmbedPhotoLink, OEmbedVideoLink } from './oEmbed.models';

class OEmbedDataService {
  public async handleOEmbedData(
    context: Context,
    data: CreateLinkDTO
  ): Promise<Link> {
    const link = new Link();
    link.url = data.url;
    let finalUrl;
    if (data.linkType === LinkType.PHOTO) {
      finalUrl = `http://www.flickr.com/services/oembed/?format=json&url=${encodeURI(
        link.url
      )}`;
    } else {
      finalUrl = `https://vimeo.com/api/oembed.json?url=${encodeURI(link.url)}`;
    }
    let result;
    try {
      result = await got(finalUrl, {
        responseType: 'json',
        resolveBodyOnly: true,
      });
    } catch (error) {
      const statusCode = (error as HTTPError).response.statusCode;
      throw new Error('Error when getting oEmbed data : Error ' + statusCode);
    }

    if (result) {
      link.author = (result as OEmbedLink).author_name;
      link.title = (result as OEmbedLink).title;
      if (data.linkType === LinkType.VIDEO) {
        link.height = (result as OEmbedVideoLink).height;
        link.width = (result as OEmbedVideoLink).width;
        link.duration = (result as OEmbedVideoLink).duration;
      } else {
        link.height = (result as OEmbedPhotoLink).height;
        link.width = (result as OEmbedPhotoLink).width;
      }
    }

    return link;
  }
}

export default OEmbedDataService;
