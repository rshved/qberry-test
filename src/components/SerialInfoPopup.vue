<template>
  <v-row justify="center" >
    <v-dialog
        fullscreen
        v-model="showSerialInfo"
        hide-overlay
        transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
            dark
            color="yellow"
            dense
        >
          <v-btn
              icon
              @click="$emit('clk')"
          >
            <v-icon color="primary">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-row class="wrap" v-if="serialInfo">
          <v-col cols="12" class="col-md-6">
            <p v-if="serialInfo.Title" class="text-center text-h3">{{serialInfo.Title}}</p>
            <p v-if="serialInfo.imdbRating" class="text-center text-h5">IMDB: {{serialInfo.imdbRating}}</p>
            <v-img v-if="serialInfo.Poster" contain max-height="500" :src="serialInfo.Poster"></v-img>
          </v-col>

          <v-col cols="12" class="col-md-6 d-flex flex-column justify-end text-left">
            <p v-if="serialInfo.Genre" class="text-h5"><span class="font-weight-bold">Genre:</span> {{serialInfo.Genre}}</p>
            <p v-if="serialInfo.Country" class="text-h5"><span class="font-weight-bold">Country:</span> {{serialInfo.Country}}</p>
            <p v-if="serialInfo.Awards" class="text-h5"><span class="font-weight-bold">Awards:</span> {{serialInfo.Awards}}</p>
            <p v-if="serialInfo.Actors" class="text-h5"><span class="font-weight-bold">Actors:</span> {{serialInfo.Actors}}</p>
            <p v-if="serialInfo.Language" class="text-h5"><span class="font-weight-bold">Language:</span> {{serialInfo.Language}}</p>
            <p v-if="serialInfo.Released" class="text-h5"><span class="font-weight-bold">Released:</span> {{serialInfo.Released}}</p>
            <p v-if="serialInfo.Runtime" class="text-h5"><span class="font-weight-bold">Runtime:</span> {{serialInfo.Runtime}}</p>
          </v-col>
          <v-col cols="12 mt-3">
            <p class="text-h4">Plot</p>
            <p v-if="serialInfo.Plot">
              {{ serialInfo.Plot }}
            </p>
          </v-col>

        </v-row>
        <div v-else class="loader-wrap">
          <v-progress-circular
              class="loader"
              indeterminate
              color="primary"
          ></v-progress-circular>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'CharactersPopup',
  props: {
    showSerialInfo: {
      type: Boolean,
    },
  },
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('getInfoAboutSerial')
  },
  computed: {
    ...mapGetters(['serialInfo'])
  }
}


</script>

<style>
.wrap {
  max-width: 700px;
  margin: 20px auto 0;
  padding: 0 10px;
  height: 100%;
}

.loader-wrap {
  position: relative;
  height: 700px;
}

.loader {
  position: absolute !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>