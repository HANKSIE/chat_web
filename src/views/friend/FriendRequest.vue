<template>
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
import { useQuasar } from "quasar";
import UnitProfile from "@/components/UnitProfile.vue";
import Unit from "@/types/unit";
import User from "@/types/user";
import SimplePaginate from "@/utils/simplePaginate";
import endpoints from "@/config/endpoints";
import api from "@/utils/api";

export default {
  components: { UnitList, SearchInput },
  setup() {
    const keyword = ref("");
    const infiniteScroll = ref<QInfiniteScroll | null>(null);
    const hasLoaded = ref(false);
    const $q = useQuasar();
    const recipients = ref<User[]>([]);
    const cursorPaginate = new SimplePaginate<User>(
      endpoints.socialite.friend.request.toMe
    );
    const load = async (_: number, done: (val: boolean) => void) => {
      const data = await (recipients.value.length === 0
        ? cursorPaginate.search(10)
        : cursorPaginate.next());
      recipients.value.push(...data);
      done(data.length === 0);
      hasLoaded.value = true;
    };

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
      keyword,
      units,
      load,
      infiniteScroll,
      hasLoaded,
      showProfile,
      accept,
      deny,
    };
  },
};
</script>
