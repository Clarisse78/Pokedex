<script setup>
import { ref, onMounted } from 'vue'
import PokemonSprites from './PokemonSprites.vue'
import pokedexApi from '../services/pokedexApi.js'
import { useRouter } from 'vue-router'
import capitalize from '../utils/utils.js'

// Define the props for the Pokemon component
/**
 * @typedef {Object} Poke
 * @property {string} name - The name of the Pokemon.
 * @property {string} url - The URL to fetch the Pokemon details.
 */
const poke = defineProps({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  }
})

// Sprites of the Pokemon
const sprites = ref([])

const router = useRouter()

// Open the page of the Pokemon
const openLink = () => {
  router.push(`/pokemon/${poke.name}`)
}

// Fetch the Pokemon sprites when the component is mounted
onMounted(async () => {
  const res = await pokedexApi.fetchPokemon(poke.url);
  sprites.value = res.data.sprites;

  const allSprites = res.data.sprites;
  const spritesUrls = [];

  for (const key in allSprites) {
    const val = allSprites[key]
    if (val !== null && typeof val === 'string') {
      if (key === 'front_default') {
        spritesUrls.unshift(val);
      } else {
        spritesUrls.push(val);
      }
    }
  }
  
  sprites.value = spritesUrls;
})
</script>

<template>
    <div @click="openLink" class="card" v-if="sprites.length">
      <h3>{{ capitalize(name) }}</h3>
      <PokemonSprites  v-if="sprites" :sprites="sprites"/>
    </div>
</template>

<style scoped>
/* Pokemon card styles */
.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
.card {
  max-height: 250px;
  padding: 16px;
  border-radius: 12px;
  text-align: center;
  background-color: #4a4e53;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}
.card:hover {
  transform: scale(1.02);
  cursor: pointer;
}
</style>