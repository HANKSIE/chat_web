<template>
  <q-input
    :model-value="modelValue"
    @update:model-value="(val) => $emit('update:modelValue', val)"
    placeholder="搜尋"
  >
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
    <template v-slot:append>
      <q-icon
        v-if="modelValue.length > 0"
        name="close"
        @click="$emit('update:modelValue', '')"
        class="cursor-pointer"
      />
    </template>
  </q-input>
</template>
<script lang="ts">
export default {
  props: ["modelValue"],
};
</script>
