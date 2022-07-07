<template>
  <q-avatar color="primary" size="25px">
    <template v-if="src !== null">
      <q-img :src="src" />
    </template>
    <template v-else>
      {{ name.length > 0 ? name[0].toUpperCase() : "?" }}
    </template>
  </q-avatar>
</template>

<script lang="ts">
import defaultAvatar from "@/assets/default_avatar.png";
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    src: {
      type: String,
      default: null,
    },
  },
  setup: () => ({ defaultAvatar }),
};
</script>
