import { ref } from "vue";

const useLoading = () => {
  const loading = ref(false);

  const loadingFunc =
    (handle: (...args: any[]) => Promise<any>) =>
    async (...args: any[]) => {
      loading.value = true;
      await handle(...args);
      loading.value = false;
    };

  return {
    loading,
    loadingFunc,
  };
};

export default useLoading;
