<template>
  <div class="home" v-if="episodes">
    <v-app-bar
        dense
    >
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="burger = !burger"></v-app-bar-nav-icon>

      <v-tabs class="hidden-sm-and-down"
      >
        <v-tab
            v-model="tab"
            @click="tab = index"
            v-for="(item, index) in episodes"
            :key="item.id"
        >
          {{index}} season
        </v-tab>
        <v-tab @click="showSerialInfo=true">
          Serial Info
        </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>

      <div class="d-flex align-center mr-3">
        <p class="my-0 mx-3">Share to:</p>
        <v-btn icon>
          <ShareNetwork
              network="facebook"
              url="http://localhost:8080/"
              title="Awesome App"
              description="Breaking Bad"
              hashtags="Frontend, Programming">
            <v-icon>mdi-facebook</v-icon>
          </ShareNetwork>
        </v-btn>
        <v-btn icon>
          <ShareNetwork
              network="telegram"
              url="http://localhost:8080/"
              title="Awesome App"
              description="Breaking Bad"
              hashtags="Frontend, Programming">
            <v-icon>mdi-send</v-icon>
          </ShareNetwork>
        </v-btn>
      </div>
      <v-text-field
          v-model="searchData"
          @keydown.enter="search(searchData)"
          class="mt-3"
          placeholder="Search"
          append-icon="mdi-magnify">
      </v-text-field>
    </v-app-bar>

    <v-navigation-drawer
        v-model="burger"
        absolute
    >
      <v-list
          nav
          dense
      >
        <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
        >
          <v-list-item @click="tab = index" v-for="(item,index) in episodes" :key="item.id">
            <v-list-item-title>{{ index }} season</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <div v-if="category && categoryInfo" class="pa-3 wrap">
      <v-row>
        <v-col cols="12" class="text-end">
          <v-btn color="primary" class="btn" @click="categoryInfo=false">X</v-btn>
        </v-col>

        <v-col v-for="item in category" :key="item.id" cols="12" class="col-sm-6 col-md-3">
          <CategoryCardInfo :info="item" />
        </v-col>
      </v-row>
    </div>

    <div>
      <div v-for="(season, index) in episodes" :key="season.id" class="wrap">
        <v-row v-if="index === tab"  class="pt-5">
          <v-col cols="12" v-for="episode in season" :key="episode.id" class="col-sm-6 col-md-3">
            <Episode
                v-if="episode.season === tab"
                :episode="episode"
                @clk="moreInfo(episode.characters)"
            />
            <v-skeleton-loader v-else class="mx-auto" type="card" width="100%"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </div>
      <CharactersPopup :characters="characters" @clk="popup = false" :dialog="popup"></CharactersPopup>
    </div>
    <SerialInfoPopup :showSerialInfo="showSerialInfo" @clk="showSerialInfo = false" />
    </div>

</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

import Episode from "@/components/Episode";
import CategoryCardInfo from "@/components/CategoryCardInfo";

import CharactersPopup from "@/components/CharactersPopup";
import SerialInfoPopup from "@/components/SerialInfoPopup";

export default {

  name: 'Home',
  data() {
    return {
      tab: '1',
      popup: false,
      searchData: '',
      categoryInfo: false,
      showSerialInfo: false,
      burger: false,
      group: null
    }
  },
  components: {
    Episode,
    CharactersPopup,
    CategoryCardInfo,
    SerialInfoPopup
  },
  created() {
    this.getAllEpisodes()
  },
  computed: {
    ...mapGetters([
      'episodes',
    ]),
    ...mapState(['characters', 'category']),
    searchedData() {
      return this.search.split(' ').join('+')
    }
  },
  methods: {
    ...mapActions({
      getAllEpisodes: 'getAllEpisodes',
      getCharactersInfo: 'getCharactersInfo',
    }),
    moreInfo(data) {
      this.getCharactersInfo(data)
      this.popup = true
    },
    search(data) {
      this.$store.dispatch('searchByCategory', data)
      this.categoryInfo = true
      this.searchData = ''
    }
  },
  watch: {
    group () {
      this.burger = false
    },
  },
}
</script>

<style scoped>
  .wrap {
    max-width: 1200px;
    margin: 0 auto;
  }
  .btn {
    right: 0;
  }
</style>
