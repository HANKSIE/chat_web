<template>
  <search v-model="keyword" />
  <q-separator />
  <q-list padding class="rounded-borders">
    <q-item clickable v-ripple v-for="friend in friends" :key="friend">
      <q-item-section avatar top>
        <avatar size="40px" :name="friend.name" :src="friend.avatar_url" />
      </q-item-section>
      <q-item-section>
        <q-item-label lines="1" class="ellipsis" style="max-width: 150px">{{
          friend.name
        }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import Search from "@/components/Search.vue";
import Avatar from "@/components/avatar.vue";
export default {
  components: { Search, Avatar },
  setup() {
    const friends = ref([
      { name: "jack", avatar_url: "https://cdn.quasar.dev/img/avatar1.jpg" },
      { name: "曾你好", avatar_url: null },
      { name: "abcdefghijklmnopqurstuvwxyz", avatar_url: null },
    ]);
    const keyword = ref("");
    return {
      friends,
      keyword,
    };
  },
};
</script>
