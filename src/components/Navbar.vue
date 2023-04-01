<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">MovieApp</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Category
            </a>
            <ul class="dropdown-menu">
              <li v-for="({ title, slug }, index) in category" :key="index"><router-link class="dropdown-item"
                  :to="{
                    name: 'category',
                    params: {
                      slug
                    }
                  }">{{ title }}</router-link></li>
            </ul>
          </li>
        </ul>
        <form class="d-flex" role="search" @submit.prevent="searchMovie">
          <input class="form-control me-2" type="search" placeholder="Search Movie..." aria-label="Search"
            v-model="searchParams">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, onMounted, ref } from "vue";
import router from "../router";

export default defineComponent({
  name: "Navbar",
  setup() {
    const category = ref();
    const searchParams = ref("");

    onMounted(async () => {
      await axios(import.meta.env.VITE_API_URL + "/category")
        .then(({ data }) => {
          category.value = data.data
        })
        .catch((error) => {
          console.log(error)
        })
    })

    function searchMovie() {
      router.push({ 
        name: "search", 
        query: { 
          s: searchParams.value 
        } 
      })
    }

    return {
      category,
      searchParams,
      searchMovie
    }
  }
})
</script>