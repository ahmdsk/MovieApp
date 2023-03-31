<template>
    <div class="container">
        <div v-if="Object.keys(movie).length == 0" style="width: 100%" class="d-flex justify-content-center">
            <span class="loading">Loading Content...</span>
        </div>
        <div class="row justify-content-center" v-else>
            <div class="col-12 col-md-8">
                <div class="embed-responsive">
                    <iframe :src="movie.streaming_links[0]" scrolling="0" allowfullscreen="true" frameborder="0" referrerpolicy="no-referrer"></iframe>
                </div>

                <div class="mt-2 alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Catatan:</strong> Jika Server Bermasalah Silakan Putar Melalui Server Cadangan!
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>

                <div class="card my-2">
                    <div class="card-body">
                        <button class="btn btn-primary me-3" v-for="(stream, index) in movie.streaming_links" :key="index"
                            @click="changeStream(stream)">
                            Server {{ index + 1 }}
                        </button>
                    </div>
                </div>

                <div class="card my-2">
                    <div class="card-header text-uppercase">Lanjut Nonton {{ movie.title }}</div>
                    <div class="card-body">
                        <router-link :to="{
                            name: 'stream-tv-eps',
                            params: {
                                slug: stream.slug,
                            }
                        }" class="btn btn-primary me-3" v-for="(stream, index) in other_links_movie"
                            :key="index">
                            Eps {{ index + 1 }}
                        </router-link>
                    </div>
                </div>

                <div class="card my-2">
                    <div class="card-header text-uppercase">Download {{ movie.title }}</div>
                    <div class="card-body download-btn">
                        <a class="btn btn-primary me-1" v-for="(download, index) in movie.download_links" :key="index"
                            :href="download.link" target="_blank">
                            {{ download.text }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
    name: "DetailMovie",
    data() {
        return {
            movie: {} as any,
            other_links_movie: {} as any
        }
    },
    methods: {
        changeStream(stream: string) {
            const iframe = document.querySelector('iframe') as HTMLIFrameElement
            iframe.src = stream
        }
    },
    async mounted() {
        await axios.get(import.meta.env.VITE_API_URL + "/movies/detail/" + this.$route.params.slug, {
                headers: {
                    'Referer': 'https://ngefilm21.club/',
                    'Referrer-Policy': 'no-referrer'
                }
            })
            .then(({ data }) => {
                this.movie = data.data
            })
            .catch((error) => {
                console.log(error)
            })

        await axios.get(import.meta.env.VITE_API_URL + "/tv/" + this.$route.params.slug, {
                headers: {
                    'Referer': 'https://ngefilm21.club/',
                    'Referrer-Policy': 'no-referrer'
                }
            })
            .then(({ data }) => {
                this.other_links_movie = data.data.streaming_links
            })
            .catch((error) => {
                console.log(error)
            })
    }
})
</script>

<style scoped>
tbody {
    font-size: .9em;
}

.embed-responsive {
    width: 100%;
    height: 450px;
}

.embed-responsive iframe {
    width: 100%;
    height: 100%;
}

.download-btn a {
    font-size: .8em;
}
</style>