<template>
  <q-editor
    square
    :model-value="modelValue"
    @update:model-value="(val) => $emit('update:modelValue', val)"
    :definitions="definitions"
    :toolbar="toolbar"
  />
</template>
<script lang="ts">
export default {
  props: ["modelValue"],
  setup() {
    const definitions = {
      image: {
        tip: "圖片上傳",
        icon: "image",
        handler: () => {},
      },
      upload: {
        tip: "檔案上傳",
        icon: "attach_file",
        handler: () => {},
      },
    };

    const toolbar = [["image", "upload"]];

    return {
      definitions,
      toolbar,
    };
  },
};
</script>
