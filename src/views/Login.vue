<template>
  <full-center>
    <q-form @submit.prevent="login">
      <q-card>
        <q-card-section>
          <div class="text-h4 text-center">登入</div>
        </q-card-section>

        <q-card-section>
          <q-input filled v-model="email" label="Email" type="email">
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <q-input filled v-model="password" label="Password" type="password">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="center">
          <div class="col-3">
            <q-btn
              label="登入"
              type="submit"
              color="primary"
              class="full-width"
            />
          </div>
        </q-card-actions>
        <q-separator class="q-mt-sm" />
        <q-card-section class="row justify-center">
          還沒註冊嗎?
        </q-card-section>
      </q-card>
    </q-form>
  </full-center>
</template>
<script lang="ts">
import { ref } from "@vue/reactivity";
import api from "@/utils/api";
import useAuthStore from "@/stores/auth";
import router from "@/router";
export default {
  setup() {
    const email = ref("iamfaker@gmail.com"),
      password = ref("iamfaker");

    const auth = useAuthStore();
    return {
      login: () =>
        api.auth.login(email.value, password.value).then((res) => {
          auth.setUser(res.data.user);
          router.push({ name: "chatroom" });
        }),
      email,
      password,
    };
  },
};
</script>
