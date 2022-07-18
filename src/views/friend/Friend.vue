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
        <q-btn flat color="alert" label="移除" @click="unfriend(unit.id)" />
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
import UnitProfile from "@/components/UnitProfile.vue";
import useChatroomStore from "@/stores/chatroom";
import EventManager from "@/utils/eventManager";
import api from "@/utils/api";
import SearchableInfiniteScroll from "@/components/SearchableInfiniteScroll.vue";
export default {
  components: { UnitList, SearchableInfiniteScroll },
  setup() {
    const friendStore = useFriendStore();

    const $q = useQuasar();
    const chatRoomStore = useChatroomStore();

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
        component: UnitProfile,
        componentProps: {
          unit,
        },
      });

    const switchChatroom = (unit: ChattableUnit) => {
      chatRoomStore.init(unit);
      EventManager.dispatch(EventManager.EventType.SWITCH_CHATROOM);
    };

    const unfriend = async (friendID: number) => {
      await api.socialite.friend.unfriend(friendID);
      friendStore.remove(friendID);
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
