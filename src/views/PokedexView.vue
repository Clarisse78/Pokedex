<script setup>
import { ref, onMounted, computed, watch  } from 'vue'
import pokedexApi from '../services/pokedexApi.js'
import PokemonCard from '../components/PokemonCard.vue'

// Index of the page
const index = ref(1)
// List of pokemons
const pokemons = ref([])
// List of pokemons by type if a type is selected
const pokemonsByType = ref([]) 
// Limit of pokemons per page
const limit = ref(20)
// True limit to load more pokemons when needed
const trueLimit = ref(100);
// Limit low is the offset for the current page
const limitLow = ref(0);
// The types of pokemons for filtering
const types = ref([])
// Selected type for filtering pokemons
const selectedType = ref('all')

// Reference to the head pokedex element for calculating nav height
const headPokedex = ref(null)
const navHeight = ref(0)

// Load the list of pokemons and types from the API
/**
  * @param {number} offset - The offset for pagination.
  * @param {number} limit - The number of pokemons to fetch.
  */
const loadPokemon = async (offset, limit) => {
    const data = await pokedexApi.fetchPokemonList(offset, limit);
    pokemons.value = [...pokemons.value, ...data.data.results];
    const typeData = await pokedexApi.fetchTypes();
    types.value = typeData.data.results;
}

onMounted(() => {
  if (headPokedex.value) {
    navHeight.value = headPokedex.value.getBoundingClientRect().height
  }
  loadPokemon(0,100)
})

// Computed property to get the limited pokemons based on the selected type and pagination
/**
 * @returns {Array} - The list of pokemons limited by the current page and type filter.
 */
const limitedPokemons = computed(() => {
  let p = [];
  if (selectedType.value === 'all') {
    p = pokemons.value.slice(limitLow.value, limitLow.value + limit.value)
  } else {
    p = pokemonsByType.value.slice(limitLow.value, limitLow.value + limit.value)
  }
  if (p.length === 0 && index.value > 1) {
    prev();
  }
  return p;
 })

// Function to go to the next page of pokemons
const next = () => {
  index.value += 1;
  if (selectedType.value === 'all') {
    if ((limitLow.value + (limit.value * 2)) > trueLimit.value) {
      loadPokemon(trueLimit.value, trueLimit.value + 100);
      trueLimit.value += 100;
    }
  }
  limitLow.value = limit.value * (index.value - 1);
}

// Function to go to the previous page of pokemons
const prev = () => {
  if (index.value == 1) {
    return;
  }
  else
  {
    index.value -= 1;
    limitLow.value = limit.value * (index.value - 1);
  }
}

// Function to handle the change of limit in the dropdown
function onLimitChange() {
  limitLow.value = limit.value * (index.value - 1);
  if (selectedType.value === 'all') {
    if ((limitLow.value + (limit.value * 2)) > trueLimit.value) {
      loadPokemon(trueLimit.value, trueLimit.value + 100);
      trueLimit.value += 100;
    }
  }
}

// Function to load pokemons by type when the selected type changes
const loadPokemonsByType = async (typeName) => {
  if (typeName === 'all') {
    await loadPokemon(0, trueLimit.value);
    pokemonsByType.value = [];
  } else {
    const type = types.value.find(t => t.name === typeName);
    const res = await pokedexApi.fetchPokemonsByType(type.url);
    pokemonsByType.value = res.data.pokemon.map(p => p.pokemon);
  }
}

// Watch for changes in the selected type and load pokemons accordingly
watch(selectedType, (newType) => {
  loadPokemonsByType(newType)
})

</script>

<template>
  <div class="main dark-mode">
    <div class="head-pokedex" ref="headPokedex">
      <div class="controls">
        <label for="limit">Display</label>
        <select id="limit" v-model="limit" @change="onLimitChange">
          <option :value="20">20</option>
          <option :value="40">40</option>
          <option :value="100">100</option>
        </select>
      </div>
       <div class="controls">
        <label for="type-filter">Filter by type</label>
        <select id="type-filter" v-model="selectedType">
          <option value="all">All</option>
          <option v-for="type in types" :key="type.name" :value="type.name">
            {{ type.name }}
          </option>
        </select>
      </div>
          <div class="buttons">
          <button @click.stop="prev">◀</button>
            <h3>Page {{ index }}</h3>
            <button @click.stop="next">▶</button>
          </div>
    </div>
  <div v-if="limitedPokemons.length" class="pokemons" :style="{ minHeight: `calc(100vh - ${navHeight}px)` }">
    <PokemonCard v-for="pokemon in limitedPokemons" :key="pokemon.name" :name="pokemon.name" :url="pokemon.url">
    </PokemonCard>
  </div>
  <div v-else class="pokemons-empty" :style="{ minHeight: `calc(100vh - ${navHeight}px)` }">
    <h2>No Pokémon found.</h2>
    </div>
</div>
</template>

<style>

.main{
  padding: 0% 10% 0% 10%;
}

/* Head of pokedex: filter and page controller */
.head-pokedex {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  margin: 0px 0px 20px 0px;
  background-color: #1f1f1f;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
}
@media (min-width: 768px) {
  .head-pokedex {
    flex-wrap: nowrap;
    justify-content: space-between;
  }
}
.controls {
  display: flex;
  align-items: center;
  gap: 10px;
}
.controls select {
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  background-color: #2c2c2c;
  color: #fff;
}
/* Buttons for change page */
.buttons{
  display: block ruby
}
button{
  color:white;
}
select
{
  text-transform: capitalize;
}


/* Pokedex container */

.pokemons{
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
}
@media (min-width: 478px) {
  .pokemons{
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 768px) {
  .pokemons{
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 868px) {
  .pokemons{
    grid-template-columns: repeat(4, 1fr);
  }
}
.pokemons-empty h2 {
  text-align: center;
  width: 100%;
}
</style>