<template>
  <search-input v-model="keyword" :search="searchFriend" />
  <q-separator />
  <q-scroll-area style="height: 70vh" class="q-mt-sm">
    <q-infinite-scroll ref="infiniteScroll" @load="load" :offset="50">
      <unit-list :units="units"></unit-list>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-scroll-area>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import UnitList from "@/components/UnitList.vue";
import SearchInput from "@/components/SearchInput.vue";
import endpoints from "@/config/endpoints";
import { computed } from "@vue/runtime-core";
import { Unit } from "@/types/components/unitlist";
import FriendSimplePaginateData from "@/types/friendSimplePaginateData";
import { QInfiniteScroll } from "quasar";
import SimplePaginate from "@/utils/simplePaginate";
export default {
  components: { UnitList, SearchInput },
  setup() {
    const keyword = ref("");
    const friends = ref<FriendSimplePaginateData[]>([]);

    const simplePaginate = new SimplePaginate<FriendSimplePaginateData>(
      endpoints.socialite.friend.simplePaginate
    );

    const infiniteScroll = ref<QInfiniteScroll | null>(null);
    const searchFriend = () => {
      friends.value = [];
      infiniteScroll.value?.resume();
    };
    const load = async (_: number, done: (val: boolean) => void) => {
      const data = await (friends.value.length === 0
        ? simplePaginate.search(10, keyword.value)
        : simplePaginate.next());
      friends.value.push(...data);
      done(data.length === 0);
    };

    searchFriend();

    const units = computed<Unit[]>(() =>
      friends.value.map((val) => {
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
      load,
      searchFriend,
      infiniteScroll,
    };
  },
};
</script>
