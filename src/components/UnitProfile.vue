<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card flat v-if="unit" style="width: 350px">
      <q-card-section class="row">
        <q-space />
        <q-btn icon="close" flat round dense @click="onDialogHide" />
      </q-card-section>
      <q-card-section class="row justify-center"
        ><Avatar :name="unit.name" :src="unit.avatar_url" size="150px"
      /></q-card-section>
      <q-card-section class="row justify-center q-py-lg">
        <span class="text-h5 ellipsis" style="max-width: 150px">
          {{ unit.name }}
        </span>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent } from "quasar";
import Avatar from "@/components/Avatar.vue";
export default {
  props: ["unit"],
  components: { Avatar },
  setup() {
    const { dialogRef, onDialogHide } = useDialogPluginComponent();
    return {
      dialogRef,
      onDialogHide,
    };
  },
};
</script>
