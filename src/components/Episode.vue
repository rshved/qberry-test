<template>
    <v-card
        @click="$emit('clk')"
        min-width="200px"
        height="600px"
        class="ma-auto d-flex flex-column justify-space-between">
      <p class="text-h4 mt-3">{{episode.title}}</p>
      <p class="text-h5">Episode: {{ episode.episode }}</p>
      <p class="flex-column d-flex">Characters: <span v-for="character in episode.characters" :key="character">
            {{character}}
          </span></p>
      <p>{{ episode.air_date }}</p>
    </v-card>
</template>

<script>
export default {
  name: 'Episode',
  props: {
    episode: {
      type: Object,
    },
  }
}

</script>