<template>
  <search-input v-model="keyword" />
  <q-separator />
  <unit-list :units="friends"></unit-list>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import UnitList from "@/components/UnitList.vue";
import User from "@/types/user";
import SearchInput from "@/components/SearchInput.vue";

export default {
  components: { UnitList, SearchInput },
  setup() {
    const keyword = ref("");
    const friends = ref<User[]>([
      {
        id: 2,
        name: "jack",
        avatar_url: "https://cdn.quasar.dev/img/avatar1.jpg",
        email: "jack@gmail.com",
      },
      { id: 3, name: "陳先生", avatar_url: null, email: "chen@gmail.com" },
      {
        id: 4,
        name: "abcdefghijklmnopqurstuvwxyz",
        avatar_url: null,
        email: "abc@gmail.com",
      },
    ]);
    return {
      friends,
      keyword,
    };
  },
};
</script>
@/components/SearchInput.vue
