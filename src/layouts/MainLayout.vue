<template>
    <div class="container">
        <Navbar />
        <div class="pt-3 pb-4">
            <slot />
        </div>
        <Footer />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

export default defineComponent({
    name: "MainLayout",
    components: {
        Navbar,
        Footer
    }
})
</script>