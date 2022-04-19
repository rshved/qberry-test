<template>
  <v-card
      v-if="character"
      class="mx-auto mt-5 rounded-lg"
      max-width="700"
      tile
  >
    <v-img
        class="pa-5"
        height="100%"
        src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
    >

      <v-row
          align="end"
          class="fill-height"
      >
        <v-col
            align-self="start"
            class="pa-0"
            cols="12"
        >
          <v-avatar
              class="profile mt-5"
              size="200"
              tile
          >
            <v-img contain :src="character.img"></v-img>
          </v-avatar>
        </v-col>
        <v-col class="py-0">
          <v-list-item
              color="rgba(0, 0, 0)"
          >
            <v-list-item-content>
              <v-list-item-title v-if="character.name" class="text-h4">
                {{ character.name }}
              </v-list-item-title>
              <v-list-item-subtitle v-if="character.birthday">{{ character.birthday }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="character.nickname" color="rgba(0, 0, 0)" dark>
            Nickname: {{ character.nickname }}
          </v-list-item>
          <v-list-item v-if="character.occupation" color="rgba(0, 0, 0)" dark>
            <div class="text-left">
              Occupation:
              <span class="d-block" v-for="item in character.occupation" :key="item">{{item}}</span>
          </div>
          </v-list-item>
          <v-list-item v-if="character.status" color="rgba(0, 0, 0)" dark>
            Status: {{ character.status }}
          </v-list-item>
          <v-list-item v-if="character.season" color="rgba(0, 0, 0)" dark>
            Died in season: {{ character.season }}
          </v-list-item>
          <v-list-item v-if="character.cause" color="rgba(0, 0, 0)" dark class="text-left">
            Cause of death: {{ character.cause }}
          </v-list-item>
          <v-list-item v-if="character.number_of_deaths" color="rgba(0, 0, 0)" dark>
            Number of deaths: {{ character.number_of_deaths }}
          </v-list-item>
          <v-list-item v-if="character.last_words" color="rgba(0, 0, 0)" dark>
            Last words: {{ character.last_words }}
          </v-list-item>
        </v-col>
      </v-row>
      <v-btn class="mx-10" @click="$router.push('/')">Back</v-btn>
    </v-img>
  </v-card>
  <v-skeleton-loader v-else class="mx-auto mt-5" type="card" max-width="700"
  ></v-skeleton-loader>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'CharactersPage',
  data() {
    return {
      id: this.$route.params.character
    }
  },
  created() {
    this.$store.dispatch('getCharacterInfo', this.characterName)
  },
  computed: {
    ...mapState(['character']),
    characterName () {
      return this.id.split(' ').join('+')
    }
  }
}
</script>

<style scoped>


</style>