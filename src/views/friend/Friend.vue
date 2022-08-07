<template>
  <search-input v-model="keyword" @search="searchableInfiniteScroll?.search" />
  <searchable-infinite-scroll
    ref="searchableInfiniteScroll"
    v-model="friendStore.friends"
    :search="search"
    :next="next"
  >
    <unit-list
      :units="units"
      @avatar-click="showProfile"
      @item-click="switchChatroom"
    >
      <template #list-item-side="{ unit }">
        <q-btn flat color="alert" label="移除" @click="unfriend(unit)" />
      </template>
    </unit-list>
  </searchable-infinite-scroll>
</template>
<script lang="ts">
import UnitList from "@/components/UnitList.vue";
import { computed, ref } from "@vue/runtime-core";
import useFriendStore from "@/stores/friend";
import ChattableUnit from "@/types/chattableUnit";
import { useQuasar } from "quasar";
import UnitProfileDialog from "@/components/UnitProfileDialog.vue";
import useChatroomStore from "@/stores/chatroom";
import EventManager from "@/utils/eventManager";
import api from "@/utils/api";
import SearchableInfiniteScroll from "@/components/SearchableInfiniteScroll.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import SearchInput from "@/components/SearchInput.vue";
import ISearchableInfiniteScroll from "@/types/searchableInfiniteScroll";
export default {
  components: { UnitList, SearchableInfiniteScroll, SearchInput },
  setup() {
    const friendStore = useFriendStore();
    const keyword = ref("");
    const $q = useQuasar();
    const chatroomStore = useChatroomStore();
    const searchableInfiniteScroll = ref<ISearchableInfiniteScroll | null>(
      null
    );
    const units = computed<ChattableUnit[]>(() =>
      friendStore.friends.map((val) => {
        const { id, name, avatar_url } = val.user;
        return {
          id,
          name,
          avatar_url,
          group_id: val.group_id,
        };
      })
    );

    const showProfile = (unit: ChattableUnit) =>
      $q.dialog({
        component: UnitProfileDialog,
        componentProps: {
          unit,
        },
      });

    const switchChatroom = (unit: ChattableUnit) => {
      chatroomStore.init(unit);
      EventManager.dispatch(EventManager.EventType.SWITCH_CHATROOM);
    };

    const unfriend = (unit: ChattableUnit) => {
      $q.dialog({
        component: ConfirmDialog,
        componentProps: {
          okHandle: async () => {
            await api.socialite.friend.unfriend(unit.id);
            if (unit.group_id === chatroomStore.unit?.group_id)
              chatroomStore.init();
            friendStore.remove(unit.id);
          },
          message: `確定要將 <span class="ellipsis text-weight-bold" style="width: 250px">${unit.name}</span> 從好友清單移除嗎?`,
        },
      });
    };

    const search = async () => {
      const data = await friendStore.simplePaginate.search(10, keyword.value);
      friendStore.push(...data);
      return data.length === 0;
    };

    const next = async () => {
      const data = await friendStore.simplePaginate.next();
      friendStore.push(...data);
      return data.length === 0;
    };

    return {
      units,
      showProfile,
      switchChatroom,
      unfriend,
      friendStore,
      keyword,
      search,
      next,
      searchableInfiniteScroll,
    };
  },
};
</script>
