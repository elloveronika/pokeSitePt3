//Example fetch using pokemonapi.co
document.querySelector("button").addEventListener("click", getFetch);

//create a function that handles displayling the sprites

//function that will handle the og fetch

async function getPokeSprites(pokemon) {
  let url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
  let res = await fetch(url);
  let data = await res.json();
  console.log("this is data inside pokesprites", data);
}

async function getFetch() {
  const choice = document.querySelector("input").value.toLowerCase();

  document.querySelector(".pokeName").innerText = choice;

  const url = "https://pokeapi.co/api/v2/pokemon/" + choice;

  let resChoice = await fetch(url);
  let dataChoice = await resChoice.json();
  console.log(dataChoice);

  //nesting inside the specias data to get evolution chain

  let resPokeSpecies = await fetch(dataChoice.species.url);

  let dataPokeSpecies = await resPokeSpecies.json();
  // console.log("this is dataPokeSpecies", dataPokeSpecies);

  let resPokeEvo = await fetch(dataPokeSpecies.evolution_chain.url);

  let dataPokeEvo = await resPokeEvo.json();
  console.table(dataPokeEvo);

  let evoBegin = dataPokeEvo.chain;

  let initialEvo = [evoBegin.species.name];

  let nextEvo = dataPokeEvo.chain.evolves_to;

  const spreadEvolves = [...nextEvo];
  console.log("this is spreadEvolves", spreadEvolves);

  // console.log("this is second evo", thirdEvoPoke);

  // const urlForFirstSprites =
  //   "https://pokeapi.co/api/v2/pokemon/" + firstEvoPoke;

  // const firstEvoSpriteRes = await fetch(urlForFirstSprites);

  // const firstEvoSpriteData = await firstEvoSpriteRes.json();

  // document.querySelector(".firstEvo").src =
  //   firstEvoSpriteData.sprites.front_shiny;

  // const urlForSecSprites = "https://pokeapi.co/api/v2/pokemon/" + secEvoPoke;
  // const secEvoSpriteRes = await fetch(urlForSecSprites);
  // const secEvoSpriteData = await secEvoSpriteRes.json();

  // document.querySelector(".secEvo").src = secEvoSpriteData.sprites.front_shiny;

  // const urlForThirdSprites =
  //   "https://pokeapi.co/api/v2/pokemon/" + thirdEvoPoke;
  // const thirdEvoSpriteRes = await fetch(urlForThirdSprites);
  // const thirdEvoSpriteData = await thirdEvoSpriteRes.json();

  // document.querySelector(".thirdEvo").src =
  //   thirdEvoSpriteData.sprites.front_shiny;
  // );
}
