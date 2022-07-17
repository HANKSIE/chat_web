<template>
  <full-center>
    <q-form @submit.prevent="register">
      <q-card>
        <q-card-section>
          <div class="text-h4 text-center">註冊</div>
        </q-card-section>

        <q-card-section>
          <q-input filled v-model="email" label="信箱" type="email">
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <q-input filled v-model="name" label="名稱" type="text">
            <template v-slot:prepend>
              <q-icon name="person" />
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
          <q-input
            filled
            v-model="confirmPassword"
            label="確認密碼"
            type="password"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-section>
          <avatar-picker v-model="avatar" />
        </q-card-section>
        <q-card-section>
          <validation-error :errors="errors" />
        </q-card-section>
        <q-card-actions class="row justify-center">
          <div class="col-3">
            <q-btn
              label="註冊"
              type="submit"
              color="primary"
              class="full-width"
            />
          </div>
        </q-card-actions>
        <q-btn
          flat
          @click="$router.push({ name: 'login' })"
          label="已經有帳號了"
        />
      </q-card>
    </q-form>
  </full-center>
</template>
<script lang="ts">
import { ref } from "@vue/reactivity";
import AvatarPicker from "@/components/AvatarPicker.vue";
import api from "@/utils/api";
import EventManager from "@/utils/eventManager";
import ValidationError from "@/components/ValidationError.vue";
import { AxiosError } from "axios";
import ValidationErrorType from "@/types/responses/validationError";
export default {
  components: { AvatarPicker, ValidationError },
  setup() {
    const email = ref(""),
      password = ref(""),
      confirmPassword = ref(""),
      name = ref(""),
      avatar = ref(null);

    const errors = ref({});
    const register = () => {
      api.auth
        .register(
          name.value,
          avatar.value,
          email.value,
          password.value,
          confirmPassword.value
        )
        .then((res) =>
          EventManager.dispatch(EventManager.EventType.LOGIN, res.data.user)
        )
        .catch((err: AxiosError<ValidationErrorType>) => {
          if (err.response?.status === 422)
            errors.value = err.response.data.errors;
        });
    };
    return {
      register,
      name,
      email,
      password,
      confirmPassword,
      avatar,
      errors,
    };
  },
};
</script>
