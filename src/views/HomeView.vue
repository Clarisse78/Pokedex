<script setup>
</script>

<template>
  <div class="home">
    <h1>Welcome to the Pokédex!</h1>
    <p>Explore all Pokémon through the <a href="https://pokeapi.co" target="_blank">PokéAPI</a>.</p>
    <RouterLink to="/pokedex">
      <button class="btn">Go to the pokedex</button>
    </RouterLink>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  font-size: 24px;
  min-height: calc(100vh - 150px);
  padding: 20px 5% 20px 5%;
}
@media (max-width: 768px) {
  .home h1{
    line-height: 45px;
    margin-bottom: 2%;
  }
  .home p {
    line-height: 35px;
    margin-bottom: 2%;
  }
}

.btn {
  margin-top: 2%;
  background-color: #ddd;
  color: black;
  padding: 5px 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 20px;
}
</style>
