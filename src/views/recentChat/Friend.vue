<template>
  <template v-if="isSearchAtLeastOnce && units.length === 0">
    <div class="q-mt-md text-h6 text-weight-bold row justify-center">
      沒有搜尋結果
    </div>
  </template>
  <template v-else>
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
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import UnitList from "@/components/UnitList.vue";
import { computed } from "@vue/runtime-core";
import { Unit } from "@/types/components/unitlist";
import { QInfiniteScroll } from "quasar";
import useRecentContactFriendStore from "@/stores/recentContactFriend";
import useAuthStore from "@/stores/auth";

export default {
  components: { UnitList },
  setup() {
    const infiniteScroll = ref<QInfiniteScroll | null>(null);
    const isSearchAtLeastOnce = ref(false);
    const recentContactFriendStore = useRecentContactFriendStore();
    const auth = useAuthStore();
    const load = async (_: number, done: (val: boolean) => void) => {
      const data = await (recentContactFriendStore.messages.length === 0
        ? recentContactFriendStore.search(10)
        : recentContactFriendStore.next());
      recentContactFriendStore.push(...data);
      done(data.length === 0);
      isSearchAtLeastOnce.value = true;
    };

    if (recentContactFriendStore.messages.length === 0)
      infiniteScroll.value?.resume();

    const units = computed<Unit[]>(() =>
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
          latest_message: message,
        };
      })
    );

    return {
      units,
      load,
      infiniteScroll,
      isSearchAtLeastOnce,
    };
  },
};
</script>
