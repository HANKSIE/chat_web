<template>
  <searchable-infinite-scroll
    v-model="recipients"
    :search="search"
    :next="next"
  >
    <unit-list
      :units="units"
      @avatar-click="showProfile"
      @item-click="showProfile"
    >
      <template #list-item-side="{ unit }">
        <q-btn dense flat label="收回" @click="revoke(unit)" />
      </template>
    </unit-list>
  </searchable-infinite-scroll>
</template>
<script lang="ts">
import { ref } from "@vue/reactivity";
import UnitList from "@/components/UnitList.vue";
import { computed } from "@vue/runtime-core";
import { useQuasar } from "quasar";
import UnitProfileDialog from "@/components/UnitProfileDialog.vue";
import Unit from "@/types/unit";
import User from "@/types/user";
import Paginate from "@/utils/paginate";
import endpoints from "@/config/endpoints";
import api from "@/utils/api";
import SearchableInfiniteScroll from "@/components/SearchableInfiniteScroll.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
export default {
  components: { UnitList, SearchableInfiniteScroll },
  setup() {
    const $q = useQuasar();
    const recipients = ref<User[]>([]);
    const paginate = new Paginate<User>(
      endpoints.socialite.friend.requests.paginate
    );

    const units = computed<Unit[]>(() =>
      recipients.value.map((recipient) => {
        const { id, name, avatar_url } = recipient;
        return {
          id,
          name,
          avatar_url,
        };
      })
    );

    const showProfile = (unit: Unit) =>
      $q.dialog({
        component: UnitProfileDialog,
        componentProps: {
          unit,
        },
      });

    const revoke = async (unit: Unit) => {
      $q.dialog({
        component: ConfirmDialog,
        componentProps: {
          okHandle: async () => {
            await api.socialite.friend.request.revoke(unit.id);
            recipients.value = recipients.value.filter((r) => r.id !== unit.id);
          },
          message: `收回給 <span class="ellipsis text-weight-bold" style="width: 250px">${unit.name}</span> 的好友邀請?`,
        },
      });
    };

    const search = async () => {
      const data = await paginate.search({ type: "send", per_page: 10 });
      recipients.value = [...data];
      return data.length === 0;
    };

    const next = async () => {
      const data = await paginate.next();
      recipients.value = [...recipients.value, ...data];
      return data.length === 0;
    };

    return {
      units,
      recipients,
      showProfile,
      revoke,
      search,
      next,
    };
  },
};
</script>
