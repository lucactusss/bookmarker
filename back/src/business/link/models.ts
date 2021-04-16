export class CreateLinkDTO {
  url: string;
  linkType: string;

  constructor(url: string, linkType: string) {
    this.url = url;
    this.linkType = linkType;
  }
}
