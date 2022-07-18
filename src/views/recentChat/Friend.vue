<template>
  <infinite-scroll
    v-model="recentContactFriendStore.messages"
    :simplePaginate="recentContactFriendStore.simplePaginate"
    :searchArgs="[1, 10]"
  >
    <unit-list
      :units="units"
      @avatar-click="showProfile"
      @item-click="switchChatroom"
    />
  </infinite-scroll>
</template>

<script lang="ts">
import UnitList from "@/components/UnitList.vue";
import { computed } from "@vue/runtime-core";
import useRecentContactFriendStore from "@/stores/recentContactFriend";
import useAuthStore from "@/stores/auth";
import ChattableUnit from "@/types/chattableUnit";
import { useQuasar } from "quasar";
import UnitProfile from "@/components/UnitProfile.vue";
import EventManager from "@/utils/eventManager";
import useChatroomStore from "@/stores/chatroom";
import InfiniteScroll from "@/components/InfiniteScroll.vue";

export default {
  components: { UnitList, InfiniteScroll },
  setup() {
    const recentContactFriendStore = useRecentContactFriendStore();
    const auth = useAuthStore();
    const $q = useQuasar();
    const chatRoomStore = useChatroomStore();

    const units = computed<ChattableUnit[]>(() =>
      recentContactFriendStore.messages.map((message) => {
        const friend = message.group!.members!.find(
          (user) => user.id !== auth.user?.id
        )!;
        const { id, name, avatar_url } = friend;
        return {
          id,
          name,
          avatar_url,
          group_id: message.group!.id,
          itemCaption: message.body,
          sideTopCaption: message.created_at,
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

    return {
      units,
      showProfile,
      switchChatroom,
      recentContactFriendStore,
    };
  },
};
</script>
