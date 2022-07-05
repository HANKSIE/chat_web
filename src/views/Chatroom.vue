<template>
  <div class="scroll" style="height: calc(71vh - 50px)">
    <template v-for="index in 20" :key="index">
      <q-chat-message
        :id="`m${index}`"
        name="someone"
        avatar="https://cdn.quasar.dev/img/avatar1.jpg"
        :text="['hey, how are you?']"
        sent
      />
    </template>
  </div>
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
