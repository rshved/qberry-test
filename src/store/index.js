import Vue from 'vue'
import Vuex from 'vuex'
import { BASE_URL } from "@/axios";
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allEpisodes: null,
    characters: null,
    character: null,
    category: null,
    serialInfo: null
  },
  getters: {
    episodes(state) {
      return state.allEpisodes
    },
    serialInfo(state) {
      return state.serialInfo
    }
  },
  mutations: {
    SET_ALL_EPISODES(state, payload) {
      state.allEpisodes = payload
    },
    SET_EPISODE_CHARACTERS(state, payload) {
      state.characters = payload
    },
    SET_CHARACTER_INFO(state, payload) {
      state.character = payload
    },
    SET_INFO_BY_CATEGORY(state, payload) {
      state.category = payload
    },
    SET_SERIAL_INFO(state, payload) {
      state.serialInfo = payload
    }
  },
  actions: {
    async getInfoAboutSerial({commit}) {
      try {
        const { data: info } = await axios.get(`http://www.omdbapi.com/?apikey=88e836ce&i=tt0903747`)

        if (info) commit('SET_SERIAL_INFO', info)
      } catch (e) {
        console.log(e)
      }
    },

    async getAllEpisodes({commit}) {
      try {
        const { data } = await BASE_URL.get('episodes')
        const first = []
        const second = []
        const third = []
        const fourth = []
        const fifth = []
        if (data) {
          data.forEach(item => {
            item.season === '1' ? first.push(item) : item.season === '2'
              ? second.push(item) : item.season === '3'
                ? third.push(item) : item.season === '4'
                  ? fourth.push(item) : fifth.push(item)
          })

          commit('SET_ALL_EPISODES', {
            1: first,
            2: second,
            3: third,
            4: fourth,
            5: fifth
          })
        }
      } catch (e) {
        console.log(e)
      }
    },

    async getCharactersInfo({commit}, payload) {
      try {
        const endpoints = payload.map(item => item.split(' ').join('+'))
        const all = []
        await axios.all(endpoints.map((endpoint) => BASE_URL.get(`/characters?name=${endpoint}`))).then(data => all.push(data))
        const charactersInfo = all[0]?.map(item => item.data[0])

        if (charactersInfo) commit('SET_EPISODE_CHARACTERS', charactersInfo)

      } catch (e) {
        console.log(e)
      }
    },

    async getCharacterInfo({commit}, payload) {
      try {
        const { data: info } = await BASE_URL.get(`/characters?name=${payload}`)
        const { data: death } = await BASE_URL.get(`/death?name=${payload}`)

        if (info && death) {
          commit('SET_CHARACTER_INFO', {
            ...info[0],
            ...death[0]
          })
        }
      } catch (e) {
        console.log(e)
      }
    },

    async searchByCategory({ commit }, payload) {
      try {
        const { data } = await BASE_URL.get(`/characters?category=${payload}`)
        if (data) commit('SET_INFO_BY_CATEGORY', data)
      } catch (e) {
        console.log(e)
      }
    }
  },
  modules: {
  }
})
