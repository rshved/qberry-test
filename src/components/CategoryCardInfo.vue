<template>
  <v-card @click="toCharactersPage(info.name)" class="mt-3 pa-3" height="100%">
    <p class="text-h6">
        Category: {{ info.category }}
    </p>
    <p v-if="info.name">{{ info.name }}</p>
    <v-img v-if="info.img" :src="info.img"></v-img>
  </v-card>
</template>

<script>
export default {
  name: 'CategoryCardInfo',
  props: {
    info: {
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