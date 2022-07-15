<template>
  <q-splitter v-model="splitterModel">
    <template v-slot:before>
      <div style="height: 100vh" class="column">
        <q-tabs
          class="col"
          v-model="tab"
          vertical
          active-color="primary"
          indicator-color="primary"
        >
          <q-tab name="profile" icon="settings">
            <q-tooltip anchor="center right" self="center left">
              個人頁面
            </q-tooltip>
          </q-tab>
          <q-tab name="recent-chat" icon="sms">
            <q-tooltip anchor="center right" self="center left">
              聊天
            </q-tooltip>
          </q-tab>
          <q-tab name="friend" icon="person">
            <q-tooltip anchor="center right" self="center left">
              好友
            </q-tooltip>
          </q-tab>
          <q-tab name="group" icon="group">
            <q-tooltip anchor="center right" self="center left">
              群組
            </q-tooltip>
          </q-tab>
          <q-space />
        </q-tabs>
        <div class="col-1 row justify-center">
          <div>
            <q-btn icon="logout" flat round @click="logout"
              ><q-tooltip anchor="center right" self="center left">
                登出
              </q-tooltip></q-btn
            >
          </div>
        </div>
      </div>
    </template>

    <template v-slot:after>
      <q-tab-panels
        v-model="tab"
        animated
        swipeable
        vertical
        transition-prev="jump-up"
        transition-next="jump-up"
      >
        <q-tab-panel name="recent-chat">
          <recent-chat-panel />
        </q-tab-panel>
        <q-tab-panel name="friend"> <friend-panel /> </q-tab-panel>
        <q-tab-panel name="group"> group </q-tab-panel>
        <q-tab-panel name="profile"><profile-panel :user="user" /></q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>
</template>
<script lang="ts">
import useAuthStore from "@/stores/auth";
import api from "@/utils/api";
import EventManager from "@/utils/eventManager";
import { ref } from "@vue/reactivity";
import FriendPanel from "@/views/Friend/Index.vue";
import ProfilePanel from "@/views/Profile.vue";
import RecentChatPanel from "@/views/recentChat/Index.vue";
export default {
  components: { ProfilePanel, FriendPanel, RecentChatPanel },
  setup() {
    const auth = useAuthStore();
    const logout = () =>
      api.auth
        .logout()
        .then(() => EventManager.dispatch(EventManager.EventType.LOGOUT));
    return {
      user: auth.user,
      logout,
      tab: ref("profile"),
      splitterModel: ref(20),
    };
  },
};
</script>
