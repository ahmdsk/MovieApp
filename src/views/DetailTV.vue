<template>
    <div class="container">
        <div v-if="Object.keys(movie).length == 0" class="d-flex justify-content-center">
            <span class="loading">Loading Content...</span>
        </div>
        <div class="row justify-content-center" v-else>
            <div class="col-12 col-md-8">
                <h3>{{ movie.title }}</h3>
                <p>{{ movie.description }}</p>

                <div class="row">
                    <div class="col-md-6">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <th scope="row" style="max-width: 60px">Diposting pada</th>
                                    <td style="max-width: 100px">{{ movie.created_at != "" ? movie.created_at : '--' }}</td>
                                </tr>
                                <tr>
                                    <th scope="row" style="max-width: 60px">Genre</th>
                                    <td style="max-width: 100px">{{ movie.genre != "" ? movie.genre : '--' }}</td>
                                </tr>
                                <tr>
                                    <th scope="row" style="max-width: 60px">Tahun</th>
                                    <td style="max-width: 100px">{{ movie.year != "" ? movie.year : '--' }}</td>
                                </tr>
                                <tr>
                                    <th scope="row" style="max-width: 60px">Negara</th>
                                    <td style="max-width: 100px">{{ movie.country != "" ? movie.country : '--' }}</td>
                                </tr>
                                <tr>
                                    <th scope="row" style="max-width: 60px">Rilis</th>
                                    <td style="max-width: 100px">{{ movie.realease != "" ? movie.realease : '--' }}</td>
                                </tr>
                                <tr>
                                    <th scope="row" style="max-width: 60px">Episode</th>
                                    <td style="max-width: 100px">{{ movie.num_episode != "" ? movie.num_episode : '--' }}</td>
                                </tr>
                                <tr>
                                    <th scope="row" style="max-width: 60px">Direksi</th>
                                    <td style="max-width: 100px">{{ movie.director != "" ? movie.director : '--' }}</td>
                                </tr>
                                <tr>
                                    <th scope="row" style="max-width: 60px">Pemain</th>
                                    <td style="max-width: 100px">{{ movie.artist != "" ? movie.artist : '--' }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="card my-2">
                    <div class="card-header text-uppercase">Nonton {{ movie.title }}</div>
                    <div class="card-body">
                        <router-link :to="{
                            name: 'stream-tv-eps',
                            params: {
                                slug: stream.slug
                            }
                        }" class="btn btn-primary me-3" v-for="(stream, index) in movie.streaming_links" :key="index">
                            Eps {{ index + 1 }}
                        </router-link>
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
            movie: {} as any
        }
    },
    methods: {
        changeStream(stream: string) {
            const iframe = document.querySelector('iframe') as HTMLIFrameElement
            iframe.src = stream
        }
    },
    async mounted() {
        await axios.get(import.meta.env.VITE_API_URL + "/tv/" + this.$route.params.slug)
            .then(({ data }) => {
                this.movie = data.data
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