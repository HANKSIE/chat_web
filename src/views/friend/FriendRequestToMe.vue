<template>
  <searchable-infinite-scroll v-model="senders" :search="search" :next="next">
    <unit-list
      :units="units"
      @avatar-click="showProfile"
      @item-click="showProfile"
    >
      <template #list-item-side="{ unit }">
        <div class="row">
          <q-btn
            dense
            flat
            color="primary"
            label="同意"
            @click="accept(unit.id)"
          />
          <q-btn
            dense
            class="q-ml-sm"
            flat
            label="刪除"
            @click="deny(unit.id)"
          />
        </div>
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
import Paginate from "@/utils/Paginate";
import endpoints from "@/config/endpoints";
import api from "@/utils/api";
import SearchableInfiniteScroll from "@/components/SearchableInfiniteScroll.vue";
import { joinGroup } from "@/utils/socialite";
export default {
  components: { UnitList, SearchableInfiniteScroll },
  setup() {
    const $q = useQuasar();
    const senders = ref<User[]>([]);
    const paginate = new Paginate<User>(
      endpoints.socialite.friend.requests.paginate
    );

    const units = computed<Unit[]>(() =>
      senders.value.map((recipient) => {
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

    const accept = async (senderID: number) => {
      try {
        const res = await api.socialite.friend.request.accept(senderID);
        joinGroup(res.data.group_id);
      } catch (err) {
        console.error(err);
      }
      senders.value = senders.value.filter((user) => user.id !== senderID);
    };

    const deny = async (senderID: number) => {
      await api.socialite.friend.request.deny(senderID);
      senders.value = senders.value.filter((user) => user.id !== senderID);
    };

    const search = async () => {
      const data = await paginate.search({ type: "receive", per_page: 10 });
      senders.value = [...data];
      return data.length === 0;
    };

    const next = async () => {
      const data = await paginate.next();
      senders.value = [...senders.value, ...data];
      return data.length === 0;
    };

    return {
      units,
      senders,
      showProfile,
      accept,
      deny,
      search,
      next,
    };
  },
};
</script>
