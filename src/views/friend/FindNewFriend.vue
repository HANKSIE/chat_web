<template>
  <searchable-infinite-scroll
    v-model="userData"
    :simplePaginate="simplePaginate"
    :searchArgs="[10]"
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
          v-if="unit.status === UserStatus.STRANGER"
          color="primary"
          label="加好友"
          @click="sendFriendRequest(unit.id)"
        />
        <q-btn
          flat
          v-if="unit.status === UserStatus.INVITE_ME"
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
import SimplePaginate from "@/utils/simplePaginate";
import endpoints from "@/config/endpoints";
import { useQuasar } from "quasar";
import UnitProfile from "@/components/UnitProfile.vue";
import api from "@/utils/api";
import { joinGroup } from "@/utils/socialite";
import SearchableInfiniteScroll from "@/components/SearchableInfiniteScroll.vue";
interface UserSimplePaginateData {
  user: User;
  status: number;
}

interface FindNewFriendUnit extends Unit {
  status: number;
}

enum UserStatus {
  STRANGER = 0,
  ME,
  FRIEND,
  INVITE_ME,
  INVITING,
}

export default {
  components: { UnitList, SearchableInfiniteScroll },
  setup() {
    const keyword = ref("");
    const $q = useQuasar();
    const simplePaginate = new SimplePaginate<UserSimplePaginateData>(
      endpoints.socialite.user.simplePaginate
    );
    const userData = ref<UserSimplePaginateData[]>([]);

    const units = computed<FindNewFriendUnit[]>(() =>
      userData.value.map((val) => {
        const { id, name, avatar_url } = val.user;
        return {
          id,
          name,
          avatar_url,
          itemCaption: ["", "我", "朋友", "", "邀請中"][val.status],
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
      const res = await api.socialite.friend.request.send(recipientID);
      const { be_friend, group_id } = res.data;
      if (be_friend) {
        userData.value.find((d) => d.user.id === recipientID)!.status =
          UserStatus.FRIEND;
        joinGroup(group_id!);
      } else {
        userData.value.find((d) => d.user.id === recipientID)!.status =
          UserStatus.INVITING;
      }
    };

    const acceptFriendRequest = async (senderID: number) => {
      const res = await api.socialite.friend.request.accept(senderID);
      userData.value.find((d) => d.user.id === senderID)!.status =
        UserStatus.FRIEND;
      joinGroup(res.data.group_id);
    };

    return {
      keyword,
      units,
      simplePaginate,
      showProfile,
      sendFriendRequest,
      acceptFriendRequest,
      UserStatus,
      userData,
    };
  },
};
</script>
