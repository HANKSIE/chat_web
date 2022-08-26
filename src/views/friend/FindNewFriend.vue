<template>
  <search-input v-model="keyword" @search="searchableInfiniteScroll?.search" />
  <searchable-infinite-scroll
    ref="searchableInfiniteScroll"
    v-model="userData"
    :search="search"
    :next="next"
    :loadAfterSearch="true"
  >
    <unit-list
      :units="units"
      @avatar-click="showProfile"
      @item-click="showProfile"
    >
      <template #list-item-side="{ unit }">
        <q-btn
          flat
          v-if="unit.state === UserState.STRANGER"
          color="primary"
          label="加好友"
          @click="sendFriendRequest(unit.id)"
        />
        <q-btn
          flat
          v-if="unit.state === UserState.INVITE_ME"
          label="同意"
          color="primary"
          @click="acceptFriendRequest(unit.id)"
        />
      </template>
    </unit-list>
  </searchable-infinite-scroll>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import UnitList from "@/components/UnitList.vue";
import { computed } from "@vue/runtime-core";
import Unit from "@/types/unit";
import User from "@/types/user";
import Paginate from "@/utils/paginate";
import endpoints from "@/config/endpoints";
import { useQuasar } from "quasar";
import UnitProfileDialog from "@/components/UnitProfileDialog.vue";
import api from "@/utils/api";
import { joinGroup } from "@/utils/socialite";
import SearchableInfiniteScroll from "@/components/SearchableInfiniteScroll.vue";
import SearchInput from "@/components/SearchInput.vue";
import ISearchableInfiniteScroll from "@/types/searchableInfiniteScroll";

interface UserPaginateData {
  user: User;
  state: number;
}

interface FindNewFriendUnit extends Unit {
  state: number;
}

enum UserState {
  STRANGER = 0,
  ME,
  FRIEND,
  INVITE_ME,
  INVITING,
}

export default {
  components: { UnitList, SearchableInfiniteScroll, SearchInput },
  setup() {
    const keyword = ref("");
    const $q = useQuasar();
    const paginate = new Paginate<UserPaginateData>(
      endpoints.socialite.user.paginate
    );
    const userData = ref<UserPaginateData[]>([]);

    const units = computed<FindNewFriendUnit[]>(() =>
      userData.value.map((val) => {
        const { id, name, avatar_url } = val.user;
        return {
          id,
          name,
          avatar_url,
          itemCaption: ["", "我", "朋友", "", "邀請中"][val.state],
          state: val.state,
        };
      })
    );

    const showProfile = (unit: FindNewFriendUnit) =>
      $q.dialog({
        component: UnitProfileDialog,
        componentProps: {
          unit,
        },
      });

    const sendFriendRequest = async (recipientID: number) => {
      const res = await api.socialite.friend.request.send(recipientID);
      const { be_friend, group_id } = res.data;
      if (be_friend) {
        userData.value.find((d) => d.user.id === recipientID)!.state =
          UserState.FRIEND;
        joinGroup(group_id!);
      } else {
        userData.value.find((d) => d.user.id === recipientID)!.state =
          UserState.INVITING;
      }
    };

    const acceptFriendRequest = async (senderID: number) => {
      const res = await api.socialite.friend.request.accept(senderID);
      userData.value.find((d) => d.user.id === senderID)!.state =
        UserState.FRIEND;
      joinGroup(res.data.group_id);
    };

    const search = async () => {
      const data = await paginate.search({ q: keyword.value, per_page: 10 });
      userData.value = [...data];
      return data.length === 0;
    };

    const next = async () => {
      const data = await paginate.next();
      userData.value = [...userData.value, ...data];
      return data.length === 0;
    };

    const searchableInfiniteScroll = ref<ISearchableInfiniteScroll | null>(
      null
    );

    return {
      keyword,
      units,
      showProfile,
      sendFriendRequest,
      acceptFriendRequest,
      UserState,
      userData,
      search,
      next,
      searchableInfiniteScroll,
    };
  },
};
</script>
