<template>
  <q-toolbar class="bg-primary">
    <q-chip v-if="chatroomStore.unit">
      <Avatar
        :name="chatroomStore.unit.name"
        :src="chatroomStore.unit.avatar_url"
      />
      <span class="q-ml-sm ellipsis" style="max-width: 500px">
        {{ chatroomStore.unit.name }}
      </span>
    </q-chip>
  </q-toolbar>
  <template v-if="chatroomStore.unit === null">
    <div style="height: calc(100vh - 50px)" class="flex flex-center text-h5">
      開始聊天吧
    </div>
  </template>
  <div v-else style="height: calc(100vh - 50px)" class="column">
    <q-scroll-area class="q-px-md col-10">
      <template v-for="message in chatroomStore.messages" :key="message.id">
        <q-chat-message
          :name="message.user.name"
          :text="[message.body]"
          :sent="message.user.id !== auth.user.id"
        >
          <template #avatar>
            <avatar
              class="q-mx-sm"
              size="45px"
              :name="message.user.name"
              :src="message.user.avatar_url"
            />
          </template>
        </q-chat-message>
      </template>
    </q-scroll-area>
    <div class="row col flex-center">
      <q-input filled class="col-8" v-model="text" placeholder="寫些甚麼吧" />
      <q-btn
        class="q-ml-md col-1 bg-primary"
        icon="send"
        @click="sendMessage"
      />
    </div>
  </div>
</template>
<script lang="ts">
import Avatar from "@/components/Avatar.vue";
import useAuthStore from "@/stores/auth";
import useChatroomStore from "@/stores/chatroom";
import { ref } from "@vue/reactivity";
import api from "@/utils/api";
export default {
  components: { Avatar },
  setup() {
    const chatroomStore = useChatroomStore();
    const auth = useAuthStore();
    const text = ref("");
    const sendMessage = async () => {
      const res = await api.socialite.group.message.send(
        chatroomStore.unit!.group_id,
        text.value
      );

      if (res.data.message) chatroomStore.pushMessage(res.data.message);
    };
    return {
      chatroomStore,
      auth,
      text,
      sendMessage,
    };
  },
};
</script>
