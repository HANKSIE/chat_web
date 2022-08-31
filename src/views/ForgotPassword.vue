<template>
  <full-center>
    <q-form @submit.prevent="sendPasswordResetLink">
      <q-card class="q-pa-lg">
        <q-card-section>
          <q-input
            filled
            v-model="email"
            label="信箱"
            type="email"
            hint="重設密碼連結將會寄送至信箱"
          />
        </q-card-section>
        <q-card-section>
          <div class="text-center">{{ loading ? "loading..." : status }}</div>
        </q-card-section>
        <q-card-section>
          <validation-error :errors="errors" />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn label="發送" type="submit" color="primary" padding="xs lg" />
        </q-card-actions>
      </q-card>
    </q-form>
  </full-center>
</template>
<script lang="ts">
import { ref } from "@vue/reactivity";
import ValidationError from "@/components/ValidationError.vue";
import { AxiosError } from "axios";
import ValidationErrorType from "@/types/responses/validationError";
import api from "@/utils/api";
import useLoading from "@/composable/loading";
export default {
  components: { ValidationError },
  setup() {
    const email = ref(""),
      status = ref(""),
      errors = ref({});

    const { loading, loadingFunc } = useLoading();
    const sendPasswordResetLink = loadingFunc(() =>
      api.auth
        .sendPasswordResetLink(email.value)
        .then((res) => {
          errors.value = {};
          status.value = res.data.status;
        })
        .catch((err: AxiosError<ValidationErrorType>) => {
          if (err.response?.status === 422)
            errors.value = err.response.data.errors;
        })
    );
    return {
      email,
      status,
      errors,
      loading,
      sendPasswordResetLink,
    };
  },
};
</script>
