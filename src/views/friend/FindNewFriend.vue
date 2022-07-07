<template>
  <search-input v-model="keyword" />
  <q-separator />
  <unit-list :units="users">
    <template #list-item-side>
      <q-btn flat icon="person_add_alt" />
    </template>
  </unit-list>
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
    const users = ref<User[]>([
      {
        id: 1,
        email: "javascript@gmail.com",
        name: "javascript",
        avatar_url: null,
      },
      { id: 2, email: "php@gmail.com", name: "php", avatar_url: null },
      { id: 3, email: "rust@gmail.com", name: "rust", avatar_url: null },
    ]);
    return {
      users,
      keyword,
    };
  },
};
</script>
