<template>
  <search-input v-model="keyword" />
  <q-separator />
  <unit-list :units="groups"></unit-list>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import UnitList from "@/components/UnitList.vue";
import SearchInput from "@/components/SearchInput.vue";

export default {
  components: { UnitList, SearchInput },
  setup() {
    const keyword = ref("");
    const groups = ref([
      {
        id: 1,
        name: "group1",
        avatar_url: null,
      },
      { id: 2, name: "group2", avatar_url: null },
    ]);
    return {
      groups,
      keyword,
    };
  },
};
</script>
@/components/SearchInput.vue
