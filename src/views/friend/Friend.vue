<template>
  <searchable-infinite-scroll
    v-model="friendStore.friends"
    :simplePaginate="friendStore.simplePaginate"
    :searchArgs="[10]"
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
import { computed } from "@vue/runtime-core";
import useFriendStore from "@/stores/friend";
import ChattableUnit from "@/types/chattableUnit";
import { useQuasar } from "quasar";
import UnitProfileDialog from "@/components/UnitProfileDialog.vue";
import useChatroomStore from "@/stores/chatroom";
import EventManager from "@/utils/eventManager";
import api from "@/utils/api";
import SearchableInfiniteScroll from "@/components/SearchableInfiniteScroll.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";

export default {
  components: { UnitList, SearchableInfiniteScroll },
  setup() {
    const friendStore = useFriendStore();

    const $q = useQuasar();
    const chatroomStore = useChatroomStore();

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

    return {
      units,
      showProfile,
      switchChatroom,
      unfriend,
      friendStore,
    };
  },
};
</script>
