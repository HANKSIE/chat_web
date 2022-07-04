<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar>
        <q-space />
        <q-chip icon="person">
          <span>{{ user.name }}</span>
        </q-chip>
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
import useAuthStore from "@/stores/auth";
import api from "@/utils/api";
import clearAuthAndRedirectToLogin from "@/utils/clearAuthAndRedirectToLogin";
import createEcho from "@/utils/createEcho";

export default {
  async setup() {
    const echo = createEcho();
    const res = await api.socialite.group.loadAllIDs();
    res.data.groups.forEach((id) =>
      echo.join(`group.${id}`).listen(".message", (e: any) => {
        console.log(e);
      })
    );
    const auth = useAuthStore();
    const logout = () =>
      api.auth.logout().then(() => clearAuthAndRedirectToLogin());
    return {
      user: auth.user,
      logout,
    };
  },
};
</script>
