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
    <q-scroll-area ref="scrollArea" class="q-pa-md col-10">
      <q-infinite-scroll
        ref="qInfiniteScroll"
        @load="loadTop"
        reverse
        :offset="10"
      >
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner color="primary" name="dots" size="40px" />
          </div>
        </template>
        <template v-for="message in chatroomStore.messages" :key="message.id">
          <template v-if="message.user">
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
              <template #stamp>
                <div class="text-grey-9">
                  {{ messageReadsText(message.id) }}
                  <span class="text-caption">
                    {{ relativeDate(message.created_at) }}
                  </span>
                </div>
              </template>
            </q-chat-message>
          </template>
          <template v-else>
            <!-- 系統訊息 -->
            <div class="row justify-center q-my-md">
              <q-card dark bordered class="q-px-md">
                <q-card-section class="column items-center">
                  <span>{{ relativeDate(message.created_at) }}</span>
                  <span>{{ message.body }}</span>
                </q-card-section>
              </q-card>
            </div>
          </template>
        </template>
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
import { QInfiniteScroll, QScrollArea } from "quasar";
import { nextTick } from "vue";
import useRecentContactFriendStore from "@/stores/recentContactFriend";
import { isCurrentChatroom } from "@/utils/socialite";
import Day from "@/utils/day";

export default {
  components: { Avatar },
  setup() {
    const chatroomStore = useChatroomStore();
    const auth = useAuthStore();
    const text = ref("");
    const scrollArea = ref<QScrollArea>();
    const qInfiniteScroll = ref<QInfiniteScroll | null>(null);
    const recentContactFriendStore = useRecentContactFriendStore();

    const scrollToBottom = () => {
      scrollArea.value?.setScrollPosition(
        "vertical",
        scrollArea.value.getScrollTarget().scrollHeight
      );
    };
    EventManager.on(
      EventManager.EventType.RECEIVE_GROUP_MESSAGE,
      (message: Message) => {
        if (!isCurrentChatroom(message.group_id)) return;
        chatroomStore.push(message);
        nextTick(() => scrollToBottom());
      }
    );
    EventManager.on(EventManager.EventType.SWITCH_CHATROOM, () => {
      scrollToBottom();
      qInfiniteScroll.value?.resume();
    });
    const loadTop = async (_: number, done: (val: boolean) => void) => {
      const messages = await (chatroomStore.messages.length === 0
        ? chatroomStore.search(10)
        : chatroomStore.loadTop());
      chatroomStore.unshift(...messages);
      done(messages.length === 0);
    };

    const sendMessage = async () => {
      const res = await api.socialite.group.message.send(
        chatroomStore.unit!.group_id,
        text.value
      );

      const message = res.data.message;
      if (message) {
        chatroomStore.push(message);

        if (message.group?.is_one_to_one)
          recentContactFriendStore.update({ message, unread: 0 });

        text.value = "";
        nextTick(() => scrollToBottom());
      }
    };

    const messageReadsText = (messageID: number) => {
      const count = chatroomStore.messageReadCount(messageID);
      const message = chatroomStore.messages.find(
        (message) => message.id === messageID
      );
      if (count > 1 && message?.user?.id === auth.user?.id) {
        return `已讀${
          chatroomStore.unit?.is_one_to_one ? "" : ` ${count - 1}`
        }`;
      } else {
        return "";
      }
    };

    return {
      chatroomStore,
      auth,
      text,
      sendMessage,
      scrollArea,
      loadTop,
      qInfiniteScroll,
      messageReadsText,
      relativeDate: Day.relative,
    };
  },
};
</script>
