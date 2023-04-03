<template>
    <div class="ps-4 pb-3">
        <h4>Category: {{ categroyParams }}</h4>
    </div>
    <div class="row">
        <div class="d-flex flex-column justify-content-center align-items-center" v-if="isloading">
            <div class="spinner-border" role="status" aria-hidden="true"></div>
            <span class="pt-2">Fetching Your Favorite Movie...</span>
        </div>
        <div class="col-md-2 col-6 mb-3 d-flex justify-content-center movie-container" v-for="(movie, index) in movies"
            :key="index" v-else>
            <div class="card movie-card" :style="{ backgroundImage: 'url(' + movie.thumbnail_url + ')' }">
                <div class="card-body">
                    <div class="d-flex justify-content-between movie-header">
                        <span class="movie-duration">{{ movie.duration == "" ? movie.episode : movie.duration }}</span>
                        <span class="movie-quality">{{ movie.quality }}</span>
                    </div>
                    <router-link :to="{
                        name: 'detail-movie',
                            params: {
                            slug: movie.slug
                        }
                    }" class="text-title py-2" v-if="movie.quality !== 'TV Show'">{{ movie.title }}</router-link>

                    <router-link :to="{
                        name: 'detail-tv',
                            params: {
                            slug: movie.slug
                        }
                    }" class="text-title" v-else>{{ movie.title }}</router-link>
                </div>
            </div>
        </div>
    </div>
    <div class="d-flex justify-content-center pt-4" v-if="max_pagination != 0 && max_pagination != null">
        <vue-awesome-paginate v-model="current_page" :on-click="changePage" :total-items="19 * (max_pagination / 2)" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import router from "../router";

export default defineComponent({
    name: "Search",
    data() {
        return {
            current_page: 1,
            max_pagination: 0,
            movies: [] as any[],
            isloading: true,
            categroyParams: ""
        }
    },
    watch: {
        '$route.params': {
            async handler(newValue) {
                this.isloading = true
                this.categroyParams = newValue.slug
                await axios.get(import.meta.env.VITE_API_URL + "/detailcategory?slug=" + newValue.slug)
                    .then(({ data }) => {
                        this.max_pagination = data.data.total_page
                        this.movies = data.data.movies
                        this.isloading = false
                    })
                    .catch((error: any) => {
                        this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: error.response.data.message,
                            confirmButtonText: 'Kembali',
                        }).then((result: any) => {
                            if (result.isConfirmed) {
                                router.push({ name: 'home' })
                            }
                        })
                        console.log(error)
                    })
            },
            immediate: true
        }
    },
    methods: {
        async changePage(page: number) {
            this.isloading = true

            await axios.get(`${import.meta.env.VITE_API_URL}/detailcategory?slug=${this.categroyParams}&page=${page}`, {
                headers: {
                    'Referer': 'https://ngefilm21.shop/',
                    'Referrer-Policy': 'no-referrer'
                }
            })
                .then(({ data }) => {
                    this.movies = data.data.movies
                    this.isloading = false
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
})
</script>

<style scoped>
.movie-card {
    width: 150px;
    height: 200px;
    background-repeat: no-repeat;
    background-position: center;
}

.movie-card .card-body {
    position: relative;
    color: #fff;
    text-align: center;
    display: flex;
    justify-content: center;
}

.card-body {
    padding: 0;
}

.card-body .text-title {
    font-size: .75em;
    font-weight: 700;
    position: absolute;
    bottom: 0;
    background-color: rgb(0 0 0 / 50%);
    width: 100%;
    text-decoration: none;
    color: #fff;
}

.movie-header {
    font-size: .7em;
    font-weight: 600;
    width: 100%;
    height: max-content;
}

.movie-header span {
    padding: 0 7px;
    overflow: hidden;
}

.movie-header span.movie-duration {
    border-top-left-radius: 5px;
    background-color: #1e8239;
}

.movie-header span.movie-quality {
    border-top-right-radius: 5px;
    background-color: #121d6f;
}
</style>