<template>
  <search-input v-model="keyword" :search="searchFriend" />
  <q-separator />
  <q-scroll-area style="height: 70vh" class="q-mt-sm">
    <unit-list :units="units"></unit-list>
  </q-scroll-area>
  <div class="row justify-center">
    <q-btn label="加載更多" color="primary" @click="next" />
  </div>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import UnitList from "@/components/UnitList.vue";
import SearchInput from "@/components/SearchInput.vue";
import useSimplePaginate from "@/compositions/useSimplePaginate";
import endpoints from "@/config/endpoints";
import { computed } from "@vue/runtime-core";
import { Unit } from "@/types/components/unitlist";
import FriendSimplePaginateData from "@/types/friendSimplePaginateData";

export default {
  components: { UnitList, SearchInput },
  setup() {
    const keyword = ref("");
    const { data, search, next } = useSimplePaginate<FriendSimplePaginateData>(
      endpoints.socialite.friend.simplePaginate,
      5
    );

    const searchFriend = () => search(keyword.value);
    searchFriend();

    const units = computed<Unit[]>(() =>
      data.value.map((val) => {
        const { id, name, avatar_url } = val.user;
        return {
          id,
          name,
          avatar_url,
          group_id: val.group_id,
          latest_message: val.latest_message,
        };
      })
    );

    return {
      keyword,
      units,
      next,
      searchFriend,
    };
  },
};
</script>
