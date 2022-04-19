<template>
  <v-row justify="center" >
    <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
            dark
            color="primary"
            dense
        >
          <v-btn
              icon
              dark
              @click="$emit('clk')"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <div class="wrap" v-if="characters">
          <v-row>
            <CharacterCard v-for="(item,index) in characters" :key="index" :character="item"/>
          </v-row>
        </div>
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
import CharacterCard from "@/components/CharacterCard";

export default {
  name: 'CharactersPopup',
  props: {
    dialog: {
      type: Boolean,
    },
    characters: {
      type: Array
    }
  },
  data() {
    return {}
  },
  components: {
    CharacterCard
  }
}


</script>

<style>
.wrap {
  max-width: 1200px;
  margin: 20px auto 0;
  padding: 0 10px;
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