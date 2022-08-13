import Dict from "@/types/dict";
import api from "@/utils/api";

class Paginate<T> {
  private _prevPageUrl: string | null = null;
  private _nextPageUrl: string | null = null;
  private _url: string;
  constructor(paginateUrl: string) {
    this._url = paginateUrl;
  }
  public async search(args: Dict<any>) {
    const res = await api.common.paginate.init<T>(this._url, args);
    const { data, next_page_url, prev_page_url } = res.data;
    this._nextPageUrl = next_page_url;
    this._prevPageUrl = prev_page_url;
    return data;
  }

  private async _page(url: string | null) {
    if (url === null) return [];
    const res = await api.common.paginate.page<T>(url);
    const { data, next_page_url, prev_page_url } = res.data;
    this._nextPageUrl = next_page_url;
    this._prevPageUrl = prev_page_url;
    return data;
  }

  public prev = () => this._page(this._prevPageUrl);
  public next = () => this._page(this._nextPageUrl);
}

export default Paginate;
