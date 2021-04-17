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

/**
 * Class used to represent the parameters of the addKeywordToLink API
 */
export class AddKeywordToLinkOptions {
  private _linkId: string;
  private _keywordId?: string | undefined;
  private _color?: string | undefined;
  private _label?: string | undefined;

  constructor(
    linkId: string,
    keywordId?: string,
    color?: string,
    label?: string
  ) {
    this._linkId = linkId;
    this._keywordId = keywordId;
    this._color = color;
    this._label = label;
  }

  public get linkId(): string {
    return this._linkId;
  }
  public set linkId(value: string) {
    this._linkId = value;
  }

  public get keywordId(): string | undefined {
    return this._keywordId;
  }
  public set keywordId(value: string | undefined) {
    this._keywordId = value;
  }

  public get color(): string | undefined {
    return this._color;
  }
  public set color(value: string | undefined) {
    this._color = value;
  }

  public get label(): string | undefined {
    return this._label;
  }
  public set label(value: string | undefined) {
    this._label = value;
  }
}
