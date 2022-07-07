<template>
  <q-avatar color="grey">
    <image-picker
      :defaultImage="defaultAvatar"
      :modelValue="modelValue"
      @update:modelValue="(val) => $emit('update:modelValue', val)"
    />
  </q-avatar>
</template>
<script lang="ts">
import ImagePicker from "@/components/ImagePicker.vue";
import defaultAvatar from "@/assets/default_avatar.png";
export default {
  components: { ImagePicker },
  props: ["modelValue"],
  setup() {
    return { defaultAvatar };
  },
};
</script>
