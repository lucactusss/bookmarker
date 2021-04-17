export class CreateLinkDTO {
  url: string;
  linkType: string;

  constructor(url: string, linkType: string) {
    this.url = url;
    this.linkType = linkType;
  }
}

/**
 * Class used to represent the parameters of the getKeywordList API
 */
export class GetLinkListOptions {
  /**
   * Page number (used to calculate offset)
   * @type number
   */
  private _pageNumber: number;

  /**
   * Page size - sent by front end as a param
   * @type number
   */
  private _pageSize: number;

  constructor(pageNumber: number, pageSize: number) {
    this._pageNumber = pageNumber;
    this._pageSize = pageSize;
  }

  public get pageNumber(): number {
    return this._pageNumber;
  }
  public set pageNumber(value: number) {
    this._pageNumber = value;
  }

  public get pageSize(): number {
    return this._pageSize;
  }
  public set pageSize(value: number) {
    this._pageSize = value;
  }
}
