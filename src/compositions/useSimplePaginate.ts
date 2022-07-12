import api from "@/utils/api";
import { ref } from "vue";

export interface SimplePaginate<T> {
  search: (...args: any[]) => Promise<T[]>;
  prev: () => Promise<T[]>;
  next: () => Promise<T[]>;
}
const useSimplePaginate = <T>(simplePaginateUrl: string) => {
  const prevPageUrl = ref<string | null>(null);
  const nextPageUrl = ref<string | null>(null);

  const search = async (...args: any[]) => {
    const res = await api.common.simplePaginate.init<T>(
      simplePaginateUrl,
      ...args
    );
    const { data, next_page_url, prev_page_url } = res.data;
    nextPageUrl.value = next_page_url;
    prevPageUrl.value = prev_page_url;
    return data;
  };

  const page = async (url: string | null) => {
    if (url === null) return [];
    const res = await api.common.simplePaginate.page<T>(url);
    const { data, next_page_url, prev_page_url } = res.data;
    nextPageUrl.value = next_page_url;
    prevPageUrl.value = prev_page_url;
    return data;
  };

  return {
    search,
    prev: () => page(prevPageUrl.value),
    next: () => page(nextPageUrl.value),
  };
};

export default useSimplePaginate;
