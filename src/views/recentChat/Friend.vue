<template>
  <div class="row justify-center text-h6">最近的聊天</div>
  <q-separator class="q-my-md" />
  <searchable-infinite-scroll
    v-model="recentContactFriendStore.data"
    :search="search"
    :next="next"
  >
    <unit-list
      :units="units"
      @avatar-click="showProfile"
      @item-click="switchChatroom"
    >
      <template #list-item-side="{ unit }">
        <q-badge
          v-if="unit.unread > 0"
          rounded
          color="red"
          :label="unit.unread"
        />
      </template>
    </unit-list>
  </searchable-infinite-scroll>
</template>

<script lang="ts">
import UnitList from "@/components/UnitList.vue";
import { computed } from "@vue/runtime-core";
import useRecentContactFriendStore from "@/stores/recentContactFriend";
import useAuthStore from "@/stores/auth";
import ChattableUnit from "@/types/chattableUnit";
import { useQuasar } from "quasar";
import UnitProfileDialog from "@/components/UnitProfileDialog.vue";
import SearchableInfiniteScroll from "@/components/SearchableInfiniteScroll.vue";
import { switchChatroom } from "@/utils/socialite";
import Day from "@/utils/day";

interface ChattableUnitWithUnread extends ChattableUnit {
  unread: number;
}

export default {
  components: { UnitList, SearchableInfiniteScroll },
  setup() {
    const recentContactFriendStore = useRecentContactFriendStore();
    const auth = useAuthStore();
    const $q = useQuasar();

    const units = computed<ChattableUnitWithUnread[]>(() =>
      recentContactFriendStore.data.map((data) => {
        const message = data.message;
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
          sideTopCaption: Day.relativeTime(message.created_at),
          unread: data.unread,
          is_one_to_one: true,
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

    const search = async () => {
      const data = await recentContactFriendStore.search(1, 10);
      recentContactFriendStore.push(...data);
      return data.length === 0;
    };

    const next = async () => {
      const data = await recentContactFriendStore.next();
      recentContactFriendStore.push(...data);
      return data.length === 0;
    };

    return {
      units,
      showProfile,
      switchChatroom,
      recentContactFriendStore,
      search,
      next,
    };
  },
};
</script>
