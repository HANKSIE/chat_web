<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar>
        <q-space />
        <q-chip icon="person">
          <span>hank</span>
        </q-chip>
        <q-btn icon="logout" flat />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
import Echo from "laravel-echo";
import Pusher from "pusher-js";

export default {
  setup() {
    const { VITE_PUSHER_APP_KEY, VITE_PUSHER_HOST, VITE_PUSHER_PORT } =
      import.meta.env;

    const client = new Pusher(VITE_PUSHER_APP_KEY, {
      wsHost: VITE_PUSHER_HOST,
      wsPort: VITE_PUSHER_PORT,
      forceTLS: false,
      disableStats: true,
      enabledTransports: ["ws", "wss"],
    });
    const echo = new Echo({
      broadcaster: "pusher",
      client,
    });
    echo.channel("public_channel").listen(".launch-broadcast", (e: any) => {
      console.log(e);
    });
  },
};
</script>
