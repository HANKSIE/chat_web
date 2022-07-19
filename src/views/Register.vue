<template>
  <full-center>
    <q-stepper v-model="step" vertical color="primary" animated>
      <q-step :name="1" title="填寫基本資料" icon="settings" :done="step > 1">
        <div style="width: 35vw">
          <div class="q-py-sm">
            <q-input filled v-model="email" label="信箱" type="email">
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>
          </div>

          <div class="q-py-sm">
            <q-input filled v-model="name" label="名稱" type="text">
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>

          <div class="q-py-sm">
            <q-input filled v-model="password" label="密碼" type="password">
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
          </div>

          <div class="q-py-sm">
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
          </div>
          <div class="row justify-center">
            <span
              class="cursor-pointer"
              @click="$router.push({ name: 'login' })"
              >已經有帳號了?</span
            >
          </div>
        </div>

        <q-stepper-navigation>
          <q-btn @click="step = 2" color="primary" label="下一步" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="設置頭像"
        icon="sentiment_satisfied"
        :done="step > 2"
      >
        <div style="width: 35vw" class="column flex-center">
          <avatar-picker v-model="avatar" :name="name" size="150px" />
          <q-btn
            class="q-mt-md"
            flat
            @click="() => (avatar = null)"
            label="清除"
          />
        </div>

        <q-stepper-navigation>
          <q-btn @click="step = 3" color="primary" label="下一步" />
          <q-btn
            flat
            @click="step = 1"
            color="primary"
            label="上一步"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="3" title="註冊" icon="check">
        <div style="width: 35vw">
          <validation-error :errors="errors" />
        </div>
        <q-stepper-navigation>
          <q-btn @click="register" color="primary" label="註冊" />
          <q-btn flat @click="step = 2" label="上一步" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
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

    const step = ref(1);
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
      step,
    };
  },
};
</script>
