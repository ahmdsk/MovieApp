<template>
    <h1>{{ msg }}</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Home",
    setup() {
        const msg = "Welcome to Your Vue.js + TypeScript App";
        return { msg };
    },
})
</script>