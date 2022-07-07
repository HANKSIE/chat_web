<template>
  <q-list padding class="rounded-borders">
    <q-item clickable v-ripple v-for="unit in units" :key="unit">
      <slot name="list-item">
        <q-item-section avatar top @click="() => showProfile(unit)">
          <slot name="list-item-avatar">
            <avatar size="40px" :name="unit.name" :src="unit.avatar_url" />
          </slot>
        </q-item-section>
        <q-item-section @click="() => showProfile(unit)">
          <slot name="list-item-content">
            <q-item-label lines="1" class="ellipsis" style="max-width: 150px">{{
              unit.name
            }}</q-item-label>
          </slot>
        </q-item-section>
        <q-item-section side>
          <slot name="list-item-side"></slot>
        </q-item-section>
      </slot>
    </q-item>
  </q-list>
  <q-dialog v-model="show">
    <slot name="dialog">
      <q-card flat v-if="unitSelected" style="width: 350px">
        <q-card-section class="row">
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup
        /></q-card-section>

        <q-card-section class="row justify-center"
          ><Avatar
            :name="unitSelected.name"
            :src="unitSelected.avatar_url"
            size="150px"
        /></q-card-section>
        <q-card-section class="row justify-center q-py-lg">
          <span class="text-h5 ellipsis" style="max-width: 150px">
            {{ unitSelected.name }}
          </span>
        </q-card-section>
      </q-card>
    </slot>
  </q-dialog>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import Avatar from "@/components/avatar.vue";
import { PropType } from "@vue/runtime-core";

interface Unit {
  name: string;
  avatar_url: string | null;
}
export default {
  props: {
    units: Object as PropType<Unit[]>,
  },
  components: { Avatar },
  setup() {
    const unitSelected = ref<Unit | null>(null);
    const show = ref(false);
    const showProfile = (unit: Unit) => {
      unitSelected.value = unit;
      show.value = true;
    };
    return {
      showProfile,
      unitSelected,
      show,
    };
  },
};
</script>
