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
    <q-scroll-area ref="scrollArea" class="q-px-md col-10">
      <q-infinite-scroll @load="loadTop" :offset="50" reverse>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner color="primary" name="dots" size="40px" />
          </div>
        </template>
        <q-chat-message
          v-for="message in chatroomStore.messages"
          :key="message.id"
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
      </q-infinite-scroll>
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
import EventManager from "@/utils/eventManager";
import Message from "@/types/message";
import { QScrollArea } from "quasar";
import { nextTick } from "vue";
import useRecentContactFriendStore from "@/stores/recentContactFriend";

export default {
  components: { Avatar },
  setup() {
    const chatroomStore = useChatroomStore();
    const auth = useAuthStore();
    const text = ref("");
    const scrollArea = ref<QScrollArea>();
    const recentContactFriendStore = useRecentContactFriendStore();
    EventManager.on(
      EventManager.EventType.RECEIVE_GROUP_MESSAGE,
      // scroll down
      (message: Message) => {
        if (chatroomStore.unit?.group_id !== message.group_id) return;
        chatroomStore.pushMessage(message);
        nextTick(() =>
          scrollArea.value?.setScrollPosition(
            "vertical",
            scrollArea.value.getScrollTarget().scrollHeight
          )
        );
      }
    );
    const loadTop = async (_: number, done: (val: boolean) => void) => {
      const messages = await (chatroomStore.messages.length === 0
        ? chatroomStore.search(10)
        : chatroomStore.loadTop());
      chatroomStore.unshiftMessage(...messages);
      done(false);
    };
    const sendMessage = async () => {
      const res = await api.socialite.group.message.send(
        chatroomStore.unit!.group_id,
        text.value
      );

      const message = res.data.message;
      if (message) {
        chatroomStore.pushMessage(message);

        if (message.group.is_one_to_one)
          recentContactFriendStore.update(message);

        text.value = "";
        nextTick(() =>
          scrollArea.value?.setScrollPosition(
            "vertical",
            scrollArea.value.getScrollTarget().scrollHeight
          )
        );
      }
    };

    return {
      chatroomStore,
      auth,
      text,
      sendMessage,
      scrollArea,
      loadTop,
    };
  },
};
</script>
