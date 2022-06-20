<template>
  <div class="q-pa-xl">
    <q-chat-message
      name="someone"
      avatar="https://cdn.quasar.dev/img/avatar1.jpg"
      :text="['hey, how are you?']"
      sent
    />
    <q-editor
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
  </div>
</template>
