/**
 * Class used to represent the parameters of the getKeywordList API
 */
export class GetKeywordListOptions {
  /**
   * Text to filter list
   * @type string
   */
  private _filterText: string;

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

  constructor(filterText: string, pageNumber: number, pageSize: number) {
    this._filterText = filterText;
    this._pageNumber = pageNumber;
    this._pageSize = pageSize;
  }

  public get filterText(): string {
    return this._filterText;
  }
  public set filterText(value: string) {
    this._filterText = value;
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
