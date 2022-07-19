<template>
  <q-tabs v-model="tab" dense>
    <q-tab name="friend" label="好友" />
    <q-tab name="find" label="尋找" />
    <q-tab name="request_to_me" label="收到的邀請" />
    <q-tab name="request_from_me" label="已寄出的邀請" />
  </q-tabs>
  <q-tab-panels v-model="tab" animated>
    <q-tab-panel name="friend">
      <friend />
    </q-tab-panel>
    <q-tab-panel name="find"> <find-new-friend /> </q-tab-panel>
    <q-tab-panel name="request_to_me"> <friend-request-to-me /> </q-tab-panel>
    <q-tab-panel name="request_from_me">
      <friend-request-from-me />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import Friend from "./Friend.vue";
import FindNewFriend from "./FindNewFriend.vue";
import FriendRequestToMe from "./FriendRequestToMe.vue";
import FriendRequestFromMe from "./FriendRequestFromMe.vue";
export default {
  components: { Friend, FindNewFriend, FriendRequestToMe, FriendRequestFromMe },
  setup: () => ({ tab: ref("friend") }),
};
</script>
