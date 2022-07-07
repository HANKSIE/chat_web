<template>
  <q-card flat>
    <q-card-section class="row justify-center text-h6">個人資訊</q-card-section>
    <q-separator />
    <q-card-section class="row justify-center"
      ><Avatar :name="user.name" :src="user.avatar_url" size="150px"
    /></q-card-section>
    <q-card-section class="row justify-between text-subtitle">
      <div class="col-4 text-weight-bolder">名稱</div>
      <span class="col ellipsis" style="max-width: 200px">{{ user.name }}</span>
    </q-card-section>
    <q-card-section class="row justify-between text-subtitle">
      <div class="col-4 text-weight-bolder">信箱</div>
      <span class="col ellipsis" style="max-width: 200px">{{
        user.email
      }}</span>
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
