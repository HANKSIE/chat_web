<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card flat style="width: 350px">
      <q-card-section class="row">
        <q-icon name="info" size="md" />
        <q-space />
        <q-btn icon="close" flat round dense @click="onDialogHide" />
      </q-card-section>
      <q-card-section class="row justify-center">
        <div v-html="message"></div>
      </q-card-section>
      <q-card-section class="row justify-end q-py-lg">
        <q-btn label="取消" flat @click="onDialogHide" />
        <q-btn label="確定" flat class="text-negative" @click="ok" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent } from "quasar";
import { toRef } from "@vue/reactivity";
export default {
  props: ["message", "okHandle"],
  emits: [...useDialogPluginComponent.emits],
  setup(props) {
    const okHandle = toRef(props, "okHandle");
    const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
    return {
      dialogRef,
      onDialogHide,
      ok: async () => {
        await okHandle.value();
        onDialogOK();
      },
    };
  },
};
</script>
