<template>
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import MainLayout from "./layouts/MainLayout.vue";
import { RouterView } from "vue-router";

export default defineComponent({
  name: "App",
  components: {
    MainLayout,
    RouterView
  }
})
</script>