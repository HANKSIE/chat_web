import api from "@/utils/api";
import { reactive, ref } from "vue";

const useSimplePaginate = <T>(simplePaginateUrl: string, perPage: number) => {
  const data = ref<T[]>([]);
  const prevPageUrl = ref<string | null>(null);
  const nextPageUrl = ref<string | null>(null);

  const search = async (keyword: string) => {
    try {
      const res = await api.common.simplePaginate.init<T>(
        simplePaginateUrl,
        perPage,
        keyword
      );
      const { next_page_url, prev_page_url } = res.data;
      data.value = reactive(res.data.data);
      nextPageUrl.value = next_page_url;
      prevPageUrl.value = prev_page_url;
    } catch (err) {
      console.error(err);
    }
  };

  const page = async (url: string | null) => {
    if (url === null) return;
    try {
      const res = await api.common.simplePaginate.page<T>(url);
      const { next_page_url, prev_page_url } = res.data;
      data.value = [...data.value, ...reactive(res.data.data)];
      nextPageUrl.value = next_page_url;
      prevPageUrl.value = prev_page_url;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    data,
    search,
    prev: () => page(prevPageUrl.value),
    next: () => page(nextPageUrl.value),
  };
};

export default useSimplePaginate;
