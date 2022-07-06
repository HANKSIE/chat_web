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
      </q-card>
    </q-form>
  </full-center>
</template>
<script lang="ts">
import { ref } from "@vue/reactivity";
import AvatarPicker from "@/components/AvatarPicker.vue";
import api from "@/utils/api";
import EventManager from "@/utils/eventManager";
export default {
  components: { AvatarPicker },
  setup() {
    const email = ref(""),
      password = ref(""),
      confirmPassword = ref(""),
      name = ref(""),
      avatar = ref(null);

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
        );
    };
    return {
      register,
      name,
      email,
      password,
      confirmPassword,
      avatar,
    };
  },
};
</script>
