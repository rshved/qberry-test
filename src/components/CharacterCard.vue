<template>
  <v-col v-if="character" cols="12"  class="col-sm-6 col-md-3 mt-3 mt-md-0">
    <v-card
        v-if="character.name"
        @click="toCharactersPage(character.name)"
        height="100%"
        class="pt-3 my-5 my-md-0"
    >
      <p class="h4">Name: {{ character.name }}</p>
      <p>Nickname: {{ character.nickname }}</p>
      <p>Status: {{ character.status }}</p>
      <v-img :src="character.img"></v-img>
    </v-card>
  </v-col>
  <v-col v-else cols="12" class="col-sm-6 col-md-3">
    <v-skeleton-loader class="mx-auto mt-5 mt-md-0 pt-3 pt-md-0" type="card" width="100%"
    ></v-skeleton-loader>
  </v-col>
</template>

<script>
export default {
  name: 'CharacterCard',
  props: {
    character: {
      type: Object
    }
  },
  methods: {
    toCharactersPage(data) {
      this.$router.push(`/${data}`)
    },
  }
}
</script>