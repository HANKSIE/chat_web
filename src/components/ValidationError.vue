<template>
  <div class="row justify-center">
    <div
      v-for="(error, i) in errorMessages"
      :key="i"
      class="q-my-sm text-negative"
    >
      {{ error }}
    </div>
  </div>
</template>
<script lang="ts">
import Dict from "@/types/dict";
import { computed, PropType } from "vue";
export default {
  props: {
    errors: {
      type: Object as PropType<Dict<string[]>>,
      default: {},
    },
  },
  setup(props) {
    return {
      errorMessages: computed(() => Object.values(props.errors)[0]),
    };
  },
};
</script>
