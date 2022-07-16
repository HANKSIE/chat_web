<template>
  <search-input v-model="keyword" @search="search" />
  <q-separator />
  <template v-if="!hasSearchAtLeastOnce">
    <div class="q-mt-md text-h6 text-weight-bold row justify-center">
      開始搜尋
    </div>
  </template>
  <template v-else-if="hasLoaded && units.length === 0">
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
          @item-click="showProfile"
        >
          <template #list-item-side="{ unit }">
            <q-btn
              flat
              v-if="unit.status === 0"
              color="primary"
              label="邀請"
              @click="sendFriendRequest(unit.id)"
            />
            <q-btn
              flat
              v-if="unit.status === 3"
              label="同意"
              color="primary"
              @click="acceptFriendRequest(unit.id)"
            />
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
import Unit from "@/types/unit";
import { QInfiniteScroll } from "quasar";
import User from "@/types/user";
import SimplePaginate from "@/utils/simplePaginate";
import endpoints from "@/config/endpoints";
import { useQuasar } from "quasar";
import UnitProfile from "@/components/UnitProfile.vue";
import api from "@/utils/api";

interface UserSimplePaginateData {
  user: User;
  status: number;
}

interface FindNewFriendUnit extends Unit {
  status: number;
}

export default {
  components: { UnitList, SearchInput },
  setup() {
    const keyword = ref("");
    const infiniteScroll = ref<QInfiniteScroll | null>(null);
    const hasLoaded = ref(false);
    const $q = useQuasar();
    const simplePaginate = new SimplePaginate<UserSimplePaginateData>(
      endpoints.socialite.user.simplePaginate
    );
    const userData = ref<UserSimplePaginateData[]>([]);
    const hasSearchAtLeastOnce = ref(false);
    const search = async () => {
      hasSearchAtLeastOnce.value = true;
      hasLoaded.value = false;
      userData.value = [];
      infiniteScroll.value?.resume();
    };

    const load = async (_: number, done: (val: boolean) => void) => {
      const data = await (userData.value.length === 0
        ? simplePaginate.search(2, keyword.value)
        : simplePaginate.next());
      userData.value.push(...data);
      done(data.length === 0);
      hasLoaded.value = true;
    };

    const units = computed<FindNewFriendUnit[]>(() =>
      userData.value.map((val) => {
        const { id, name, avatar_url } = val.user;
        return {
          id,
          name,
          avatar_url,
          itemCaption: ["", "我", "朋友", "正在邀請你", "邀請中"][val.status],
          status: val.status,
        };
      })
    );

    const showProfile = (unit: FindNewFriendUnit) =>
      $q.dialog({
        component: UnitProfile,
        componentProps: {
          unit,
        },
      });

    const sendFriendRequest = async (recipientID: number) => {
      await api.socialite.friend.request.send(recipientID);
      userData.value.find((d) => d.user.id === recipientID)!.status = 4;
    };

    const acceptFriendRequest = async (senderID: number) => {
      await api.socialite.friend.request.accept(senderID);
      userData.value.find((d) => d.user.id === senderID)!.status = 2;
    };

    return {
      keyword,
      units,
      load,
      search,
      infiniteScroll,
      hasLoaded,
      hasSearchAtLeastOnce,
      showProfile,
      sendFriendRequest,
      acceptFriendRequest,
    };
  },
};
</script>
