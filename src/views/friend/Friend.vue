<template>
  <search-input v-model="keyword" :search="searchFriend" />
  <q-separator />
  <q-scroll-area style="height: 70vh" class="q-mt-sm">
    <unit-list :units="data"></unit-list>
  </q-scroll-area>
  <q-btn label="next" @click="next" />
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import UnitList from "@/components/UnitList.vue";
import SearchInput from "@/components/SearchInput.vue";
import useSimplePaginate from "@/compositions/useSimplePaginate";
import endpoints from "@/config/endpoints";

export default {
  components: { UnitList, SearchInput },
  setup() {
    const keyword = ref("");
    const { data, search, next } = useSimplePaginate(
      endpoints.socialite.friend.simplePaginate,
      5
    );

    const searchFriend = () => search(keyword.value);
    searchFriend();
    return {
      keyword,
      data,
      next,
      searchFriend,
    };
  },
};
</script>
