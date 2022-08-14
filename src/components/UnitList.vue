<template>
  <q-list padding class="rounded-borders">
    <q-item clickable v-ripple v-for="unit in units" :key="unit">
      <slot name="list-item">
        <q-item-section avatar top @click="$emit('avatar-click', unit)">
          <slot name="list-item-avatar">
            <avatar size="40px" :name="unit.name" :src="unit.avatar_url" />
          </slot>
        </q-item-section>
        <q-item-section @click="$emit('item-click', unit)">
          <slot name="list-item-content">
            <q-item-label lines="1" class="ellipsis" style="max-width: 70px">{{
              unit.name
            }}</q-item-label>
            <q-item-label
              caption
              class="ellipsis"
              style="max-width: 100px"
              v-if="unit.itemCaption"
              >{{ unit.itemCaption }}</q-item-label
            >
          </slot>
        </q-item-section>
        <q-item-section side top>
          <q-item-label caption v-if="unit.sideTopCaption">
            {{ unit.sideTopCaption }}
          </q-item-label>
          <slot name="list-item-side" :unit="unit"></slot>
        </q-item-section>
      </slot>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import Avatar from "@/components/Avatar.vue";
import { PropType } from "@vue/runtime-core";
import Unit from "@/types/unit";

export default {
  props: {
    units: Object as PropType<Unit[]>,
  },
  components: { Avatar },
  emits: ["avatar-click", "item-click"],
};
</script>
