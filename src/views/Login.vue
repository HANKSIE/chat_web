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
        <q-card-section>
          <validation-error :errors="errors" />
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
          <q-btn
            flat
            @click="$router.push({ name: 'register' })"
            label="還沒註冊嗎?"
          />
        </q-card-section>
      </q-card>
    </q-form>
  </full-center>
</template>
<script lang="ts">
import { ref } from "@vue/reactivity";
import api from "@/utils/api";
import EventManager from "@/utils/eventManager";
import ValidationError from "@/components/ValidationError.vue";
import { AxiosError } from "axios";
import ValidationErrorType from "@/types/responses/validationError";
export default {
  components: { ValidationError },
  setup() {
    const email = ref("iamfaker@gmail.com"),
      password = ref("iamfaker");

    const errors = ref({});
    return {
      login: () =>
        api.auth
          .login(email.value, password.value)
          .then((res) => {
            EventManager.dispatch(EventManager.EventType.LOGIN, res.data.user);
            errors.value = {};
          })
          .catch((err: AxiosError<ValidationErrorType>) => {
            if (err.response?.status === 422)
              errors.value = err.response.data.errors;
          }),
      email,
      password,
      errors,
    };
  },
};
</script>
