<template>
  <q-layout view="hHh lpR fFf">
    <q-drawer
      behavior="desktop"
      elevated
      show-if-above
      side="left"
      :width="400"
    >
      <drawer />
    </q-drawer>

    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
import Drawer from "@/components/Drawer.vue";
export default {
  components: { Drawer },
};
</script>
