<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar>
        <q-space />
        <div>
          <q-avatar color="white"
            ><img :src="user.avatar_url || defaultAvatar"
          /></q-avatar>
          {{ user.name }}
        </div>
        <q-btn icon="sms" flat>
          <q-badge floating color="red" rounded>10</q-badge>
        </q-btn>
        <q-btn icon="logout" flat @click="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
import defaultAvatar from "@/assets/default_avatar.png";
import useAuthStore from "@/stores/auth";
import api from "@/utils/api";
import EventManager from "@/utils/eventManager";
export default {
  setup() {
    const auth = useAuthStore();
    const logout = () =>
      api.auth
        .logout()
        .then(() => EventManager.dispatch(EventManager.EventType.LOGOUT));
    return {
      user: auth.user,
      logout,
      defaultAvatar,
    };
  },
};
</script>
