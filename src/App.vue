<template>
  <router-view />
</template>
<script lang="ts">
import { useQuasar } from "quasar";

export default {
  setup() {
    useQuasar().dark.set(true);
  },
};
</script>
