<template>
  <full-center>
    <q-card class="q-pa-lg">
      <q-card-section>
        <q-input filled v-model="password" label="密碼" type="password" />
      </q-card-section>
      <q-card-section>
        <q-input
          filled
          v-model="passwordConfirmation"
          label="確認密碼"
          type="password"
        />
      </q-card-section>
      <q-card-section>
        <div class="text-center">{{ loading ? "loading..." : status }}</div>
      </q-card-section>
      <q-card-section>
        <validation-error :errors="errors" />
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          :label="isReset ? '返回登入頁' : '發送'"
          color="primary"
          padding="xs lg"
          @click="
            () => (isReset ? $router.push({ name: 'login' }) : resetPassword())
          "
        />
      </q-card-actions>
    </q-card>
  </full-center>
</template>
<script lang="ts">
import { ref } from "@vue/reactivity";
import ValidationError from "@/components/ValidationError.vue";
import { AxiosError } from "axios";
import ValidationErrorType from "@/types/responses/validationError";
import api from "@/utils/api";
import { useRoute } from "vue-router";
import useLoading from "@/composable/loading";

export default {
  components: { ValidationError },
  setup() {
    const route = useRoute();
    const status = ref(""),
      password = ref(""),
      passwordConfirmation = ref(""),
      errors = ref({}),
      isReset = ref(false);

    const email = route.query.email?.toString() || "",
      token = route.params.token.toString();
    const { loading, loadingFunc } = useLoading();
    const resetPassword = loadingFunc(() =>
      api.auth
        .resetPassword({
          email,
          token,
          password: password.value,
          password_confirmation: passwordConfirmation.value,
        })
        .then((res) => {
          errors.value = {};
          status.value = res.data.status;
          isReset.value = true;
        })
        .catch((err: AxiosError<ValidationErrorType>) => {
          if (err.response?.status === 422)
            errors.value = err.response.data.errors;
        })
    );

    return {
      loading,
      email,
      token,
      password,
      passwordConfirmation,
      status,
      errors,
      isReset,
      resetPassword,
    };
  },
};
</script>
