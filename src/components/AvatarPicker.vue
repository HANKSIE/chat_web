<template>
  <q-avatar
    :color="imageUrl.length > 0 ? 'white' : 'primary'"
    @click="openFileChooser"
    class="cursor-point"
  >
    <template v-if="imageUrl.length > 0">
      <q-img :src="imageUrl" />
    </template>
    <template v-else>
      {{ name.length > 0 ? name[0].toUpperCase() : "?" }}
    </template>
    <input
      type="file"
      class="hidden"
      accept="image/*"
      ref="fileChooser"
      @change="updateImage"
    />
  </q-avatar>
</template>
<script lang="ts">
import { computed, PropType, ref, toRef } from "vue";
export default {
  props: {
    modelValue: {
      type: Object as PropType<File | null>,
    },
    name: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const modelValue = toRef(props, "modelValue");
    const image = ref<File | null>(null);
    const imageUrl = computed<string>(() =>
      modelValue.value ? URL.createObjectURL(modelValue.value) : ""
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
