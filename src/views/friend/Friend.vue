<template>
  <search-input v-model="keyword" @search="search" />
  <q-separator />
  <template v-if="hasLoaded && units.length === 0">
    <div class="q-mt-md text-h6 text-weight-bold row justify-center">
      沒有搜尋結果
    </div>
  </template>
  <template v-else>
    <q-scroll-area style="height: 70vh" class="q-mt-sm">
      <q-infinite-scroll ref="infiniteScroll" @load="load" :offset="50">
        <unit-list
          :units="units"
          @avatar-click="showProfile"
          @item-click="switchChatroom"
        >
          <template #list-item-side="{ unit }">
            <q-btn flat color="alert" label="移除" @click="unfriend(unit.id)" />
          </template>
        </unit-list>
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
import SearchInput from "@/components/SearchInput.vue";
import { computed } from "@vue/runtime-core";
import { QInfiniteScroll } from "quasar";
import useFriendStore from "@/stores/friend";
import ChattableUnit from "@/types/chattableUnit";
import { useQuasar } from "quasar";
import UnitProfile from "@/components/UnitProfile.vue";
import useChatroomStore from "@/stores/chatroom";
import EventManager from "@/utils/eventManager";
import api from "@/utils/api";

export default {
  components: { UnitList, SearchInput },
  setup() {
    const keyword = ref("");
    const infiniteScroll = ref<QInfiniteScroll | null>(null);
    const hasLoaded = ref(false);
    const friendStore = useFriendStore();
    const $q = useQuasar();
    const chatRoomStore = useChatroomStore();
    const search = () => {
      hasLoaded.value = false;
      friendStore.clear();
      infiniteScroll.value?.resume();
    };

    const load = async (_: number, done: (val: boolean) => void) => {
      const data = await (friendStore.friends.length === 0
        ? friendStore.search(10, keyword.value)
        : friendStore.next());
      friendStore.push(...data);
      done(data.length === 0);
      hasLoaded.value = true;
    };

    if (friendStore.friends.length === 0) search();

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
      keyword,
      units,
      load,
      search,
      infiniteScroll,
      hasLoaded,
      showProfile,
      switchChatroom,
      unfriend,
    };
  },
};
</script>
