<template>
  <full-center>
    <q-form @submit.prevent="login">
      <q-card>
        <q-card-section>
          <div class="text-h4 text-center">登入</div>
        </q-card-section>

        <q-card-section>
          <q-input filled v-model="email" label="信箱" type="email">
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <q-input filled v-model="password" label="密碼" type="password">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions class="row justify-center">
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
import EventManager from "@/utils/eventManager";
export default {
  setup() {
    const email = ref("iamfaker@gmail.com"),
      password = ref("iamfaker");

    return {
      login: () =>
        api.auth
          .login(email.value, password.value)
          .then((res) =>
            EventManager.dispatch(EventManager.EventType.LOGIN, res.data.user)
          ),
      email,
      password,
    };
  },
};
</script>
