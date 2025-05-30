<template>
  <div class="about">
    <h1>About this website</h1>
    <p>
      This project is an interactive Pokédex developed in Vue.js. It uses data from
      <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer">PokéAPI</a>,
      a free REST API providing detailed information about all Pokémon.
    </p>
    <p>
      You can browse the list of Pokémon, check their stats, types, abilities, and much more.
    </p>
  </div>
</template>

<style>
.about {
    text-align: center;
    font-size: 24px;
    min-height: calc(100vh - 150px);
    padding: 20px 5% 20px 5%;
  }

.about a {
  color: #007BFF;
  text-decoration: none;
}

.about a:hover {
  text-decoration: underline;
}
</style>
