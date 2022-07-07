<template>
  <q-card flat>
    <q-card-section class="row justify-center text-h6">個人資訊</q-card-section>
    <q-separator />
    <q-card-section class="row justify-center"
      ><Avatar :name="user.name" :src="user.avatar_url" size="150px"
    /></q-card-section>
    <q-card-section class="ellipsis" style="max-width: 300px">
      名稱: {{ user.name }}
    </q-card-section>
    <q-card-section class="ellipsis" style="max-width: 300px">
      信箱: {{ user.email }}
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import Avatar from "@/components/Avatar.vue";
export default {
  props: ["user"],
  components: { Avatar },
};
</script>
