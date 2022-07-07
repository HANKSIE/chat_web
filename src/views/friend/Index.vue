<template>
  <q-tabs v-model="tab" dense>
    <q-tab name="friend" label="好友" />
    <q-tab name="find" label="尋找" />
  </q-tabs>
  <q-tab-panels v-model="tab" animated>
    <q-tab-panel name="friend">
      <friend />
    </q-tab-panel>
    <q-tab-panel name="find"> <find-new-friend /> </q-tab-panel>
  </q-tab-panels>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import Friend from "./Friend.vue";
import FindNewFriend from "./FindNewFriend.vue";
export default {
  components: { Friend, FindNewFriend },
  setup: () => ({ tab: ref("friend") }),
};
</script>
