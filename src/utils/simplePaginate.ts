import api from "@/utils/api";

class SimplePaginate<T> {
  private _prevPageUrl: string | null = null;
  private _nextPageUrl: string | null = null;
  private _url: string;
  constructor(simplePaginateUrl: string) {
    this._url = simplePaginateUrl;
  }
  public async search(...args: any[]) {
    const res = await api.common.simplePaginate.init<T>(this._url, ...args);
    const { data, next_page_url, prev_page_url } = res.data;
    this._nextPageUrl = next_page_url;
    this._prevPageUrl = prev_page_url;
    return data;
  }

  private async _page(url: string | null) {
    if (url === null) return [];
    const res = await api.common.simplePaginate.page<T>(url);
    const { data, next_page_url, prev_page_url } = res.data;
    this._nextPageUrl = next_page_url;
    this._prevPageUrl = prev_page_url;
    return data;
  }

  public prev = () => this._page(this._prevPageUrl);
  public next = () => this._page(this._nextPageUrl);
}

export default SimplePaginate;
