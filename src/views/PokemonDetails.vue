<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import pokedexApi from '../services/pokedexApi.js';
import capitalize from '../utils/utils.js';
import PokemonStats from '../components/PokemonStats.vue';
import PokemonTypes from '../components/PokemonTypes.vue';
import PokemonAbilities from '../components/PokemonAbilities.vue';
import PokemonSprite from '../components/PokemonSprite.vue';

const route = useRoute();
const name = route.params.name;

// Actual pokemon
const pokemon = ref(null);

onMounted(async () => {
  const res = await pokedexApi.fetchPokemonByName(name);
  pokemon.value = res.data;
})
</script>

<template>
  <div v-if="pokemon" class="details">
    <h1>{{ capitalize(pokemon.name) }}</h1>
    <div class="details-inside">
      <PokemonSprite :src="pokemon.sprites.front_default" :alt="name + ' sprite'" />

      <div class="info-container">
        <div class="informations">
          <h2>Information</h2>
            <table class="data">
              <tbody>
                <tr>
                  <th>N°</th>
                  <td><strong>{{pokemon.id.toString().padStart(3, '0')}}</strong></td>
                </tr>
                <tr>
                    <th>Types</th>
                    <td>
                      <PokemonTypes :types="pokemon.types" />
                    </td>
                </tr>
                <tr>
                    <th>
                      Weight
                    </th>
                  <td>
                      {{ pokemon.weight }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        <div>
          <h2>Abilities</h2>
          <PokemonAbilities :abilities="pokemon.abilities" />
        </div>
      </div>
      <PokemonStats :stats="pokemon.stats" />
    </div>
  </div>
  <div v-else class="loading">
    Loading...
  </div>
</template>

<style scoped>

/* Loading state */
.loading {
  text-align: center;
  font-size: 24px;
  min-height: calc(100vh - 150px);
}

/* Details container */
.details-inside{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
}
.details {
  padding: 20px;
  text-align: center;
  min-height: calc(100vh - 150px);
}

/* Data container */
.info-container {
  display: flex;
  flex-direction: column;
  gap: 32px; 
}

/* Pokemon data */
.data tr{
  text-align: center;
  white-space: nowrap;
}
.data {
  margin: 0 auto;
  padding: 4px;
  margin-top: 12px;
  width: auto;
  border-collapse: collapse;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
.data th {
  text-align: left;
  white-space: nowrap;
  padding-right: 16px;
}
.data td {
  text-align: center;
  white-space: nowrap;
}

/* Pokemon stats table */
.stats-table {
  grid-column: 1 / 3;
  margin-top: 2rem;
}
</style>