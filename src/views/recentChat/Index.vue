<template>
  <q-tabs v-model="tab" dense>
    <q-tab name="friend" label="朋友" />
    <q-tab name="group" label="群組" />
  </q-tabs>
  <q-tab-panels v-model="tab" animated>
    <q-tab-panel name="friend">
      <friend />
    </q-tab-panel>
    <q-tab-panel name="group"> group </q-tab-panel>
  </q-tab-panels>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import Friend from "./Friend.vue";
export default {
  components: { Friend },
  setup: () => ({ tab: ref("friend") }),
};
</script>
