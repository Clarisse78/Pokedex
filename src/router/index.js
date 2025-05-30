import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PokedexView from '@/views/PokedexView.vue'
import PokemonDetails from '@/views/PokemonDetails.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/pokedex',
      name: 'pokedex',
      component: PokedexView,
    },
    {
      path: '/pokemon/:name',
      name: 'PokemonDetail',
      component: PokemonDetails,
      props: true
    }
  ],
})

export default router
