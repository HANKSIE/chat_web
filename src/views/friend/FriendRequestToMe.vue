<template>
  <infinite-scroll
    v-model="senders"
    :simplePaginate="cursorPaginate"
    :searchArgs="[10]"
  >
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
  </infinite-scroll>
</template>
<script lang="ts">
import { ref } from "@vue/reactivity";
import UnitList from "@/components/UnitList.vue";
import { computed } from "@vue/runtime-core";
import { useQuasar } from "quasar";
import UnitProfileDialog from "@/components/UnitProfileDialog.vue";
import Unit from "@/types/unit";
import User from "@/types/user";
import SimplePaginate from "@/utils/simplePaginate";
import endpoints from "@/config/endpoints";
import api from "@/utils/api";
import InfiniteScroll from "@/components/InfiniteScroll.vue";
import { joinGroup } from "@/utils/socialite";
export default {
  components: { UnitList, InfiniteScroll },
  setup() {
    const $q = useQuasar();
    const senders = ref<User[]>([]);
    const cursorPaginate = new SimplePaginate<User>(
      endpoints.socialite.friend.request.toMe
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
      const res = await api.socialite.friend.request.accept(senderID);
      senders.value = senders.value.filter((user) => user.id !== senderID);
      joinGroup(res.data.group_id);
    };

    const deny = async (senderID: number) => {
      await api.socialite.friend.request.deny(senderID);
      senders.value = senders.value.filter((user) => user.id !== senderID);
    };
    return {
      units,
      cursorPaginate,
      senders,
      showProfile,
      accept,
      deny,
    };
  },
};
</script>