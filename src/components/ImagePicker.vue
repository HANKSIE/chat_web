<template>
  <q-img
    :src="imageUrl.length === 0 ? defaultImage : imageUrl"
    spinner-color="white"
    @click="openFileChooser"
  />
  <input
    type="file"
    class="hidden"
    accept="image/*"
    ref="fileChooser"
    @change="updateImage"
  />
</template>
<script lang="ts">
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
export default {
  props: ["defaultImage", "modelValue"],
  setup(_, { emit }) {
    const image = ref<File | null>(null);
    const imageUrl = computed<string>(() =>
      image.value ? URL.createObjectURL(image.value) : ""
    );
    const fileChooser = ref<HTMLInputElement | null>();
    const openFileChooser = () => {
      fileChooser.value?.click();
    };
    const updateImage = () => {
      const imgs = fileChooser.value?.files;
      if (imgs && imgs.length > 0 && isFileImage(imgs[0])) {
        image.value = imgs[0];
        emit("update:modelValue", image.value);
      }
    };

    const isFileImage = (file: File) => file["type"].split("/")[0] === "image";

    return {
      image,
      imageUrl,
      fileChooser,
      openFileChooser,
      updateImage,
    };
  },
};
</script>
