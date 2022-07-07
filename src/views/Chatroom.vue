<template>
  <q-toolbar class="bg-primary">
    <q-chip>
      <Avatar :name="'friend'" />
      <span class="q-ml-sm ellipsis" style="max-width: 500px"
        >friend</span
      ></q-chip
    >
  </q-toolbar>
  <q-scroll-area style="height: calc(71vh - 50px)" class="q-px-md">
    <template v-for="index in 20" :key="index">
      <q-chat-message
        :id="`m${index}`"
        name="someone"
        avatar="https://cdn.quasar.dev/img/avatar1.jpg"
        :text="['hey, how are you?']"
        sent
      />
    </template>
  </q-scroll-area>
  <q-editor
    square
    height="calc(30vh - 50px)"
    modelValue=""
    :definitions="{
      image: {
        tip: '圖片上傳',
        icon: 'image',
        handler: () => {},
      },
      upload: {
        tip: '檔案上傳',
        icon: 'attach_file',
        handler: () => {},
      },
    }"
    :toolbar="[['image', 'upload']]"
  />
</template>
<script lang="ts">
import Avatar from "@/components/Avatar.vue";
export default {
  components: { Avatar },
  setup() {},
};
</script>
