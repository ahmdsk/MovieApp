<template>
    <div v-if="Object.keys(movie).length == 0" style="width: 100%">
        <span class="loading">Loading Content...</span>
    </div>
    <div class="container" v-else>
        <div class="row justify-content-center">
            <div class="col-12 col-md-8">
                <div class="embed-responsive">
                    <iframe :src="movie.streaming_links[0]" scrolling="0" allowfullscreen="true" frameborder="0"></iframe>
                </div>

                <div class="card my-2">
                    <div class="card-body">
                        <button class="btn btn-primary me-3" v-for="(stream, index) in movie.streaming_links" :key="index" @click="changeStream(stream)">
                            Server {{ index + 1 }}
                        </button>
                    </div>
                </div>

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
                                    <th scope="row" style="max-width: 60px">Tagline</th>
                                    <td style="max-width: 100px">{{ movie.tagline != "" ? movie.tagline : '--' }}</td>
                                </tr>
                                <tr>
                                    <th scope="row" style="max-width: 60px">Rating</th>
                                    <td style="max-width: 100px">{{ movie.rating != "" ? movie.rating : '--' }}</td>
                                </tr>
                                <tr>
                                    <th scope="row" style="max-width: 60px">Genre</th>
                                    <td style="max-width: 100px">{{ movie.genre != "" ? movie.genre : '--' }}</td>
                                </tr>
                                <tr>
                                    <th scope="row" style="max-width: 60px">Kualitas</th>
                                    <td style="max-width: 100px">{{ movie.quality != "" ? movie.quality : '--' }}</td>
                                </tr>
                                <tr>
                                    <th scope="row" style="max-width: 60px">Tahun</th>
                                    <td style="max-width: 100px">{{ movie.year != "" ? movie.year : '--' }}</td>
                                </tr>
                                <tr>
                                    <th scope="row" style="max-width: 60px">Durasi</th>
                                    <td style="max-width: 100px">{{ movie.duration != "" ? movie.duration : '--' }}</td>
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
                                    <th scope="row" style="max-width: 60px">Bahasa</th>
                                    <td style="max-width: 100px">{{ movie.language != "" ? movie.language : '--' }}</td>
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
                    <div class="card-header text-uppercase">Download {{ movie.title }}</div>
                    <div class="card-body download-btn">
                        <a class="btn btn-primary me-1" v-for="(download, index) in movie.download_links" :key="index" :href="download.link" target="_blank">
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
        await axios.get(import.meta.env.VITE_API_URL + "/movies/detail/" + this.$route.params.slug)
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