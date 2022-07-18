<template>
  <infinite-scroll
    v-model="recipients"
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
import UnitProfile from "@/components/UnitProfile.vue";
import Unit from "@/types/unit";
import User from "@/types/user";
import SimplePaginate from "@/utils/simplePaginate";
import endpoints from "@/config/endpoints";
import api from "@/utils/api";
import InfiniteScroll from "@/components/InfiniteScroll.vue";
export default {
  components: { UnitList, InfiniteScroll },
  setup() {
    const $q = useQuasar();
    const recipients = ref<User[]>([]);
    const cursorPaginate = new SimplePaginate<User>(
      endpoints.socialite.friend.request.toMe
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
        component: UnitProfile,
        componentProps: {
          unit,
        },
      });

    const accept = async (senderID: number) => {
      await api.socialite.friend.request.accept(senderID);
      recipients.value = recipients.value.filter(
        (user) => user.id !== senderID
      );
    };

    const deny = async (senderID: number) => {
      await api.socialite.friend.request.deny(senderID);
      recipients.value = recipients.value.filter(
        (user) => user.id !== senderID
      );
    };
    return {
      units,
      cursorPaginate,
      recipients,
      showProfile,
      accept,
      deny,
    };
  },
};
</script>
