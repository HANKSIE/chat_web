import { computed, ref } from "vue";

export default () => {
  const image = ref<File | null>(null);
  const imageUrl = computed<string>(() =>
    image.value ? URL.createObjectURL(image.value) : ""
  );
  return {
    image,
    imageUrl,
  };
};
