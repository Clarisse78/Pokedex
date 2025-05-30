import api, { rawAxios } from './api';

export default {
    fetchPokemonList(offset = 0, limit = 100) {
        return api.get(`/pokemon?offset=${offset}&limit=${limit}`);
    },
    fetchPokemon(url)
    {
        return rawAxios.get(url);
    },
    fetchPokemonByName(name)
    {
        return api.get(`/pokemon/${name}`);
    },
    fetchTypes() {
        return api.get('/type');
    },
    fetchPokemonsByType(url) {
        return rawAxios.get(url);
    }
} 
