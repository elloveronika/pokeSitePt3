//Example fetch using pokemonapi.co
document.querySelector("button").addEventListener("click", getPokeNames);

//create a function that handles displayling the sprites

//function that will handle the og fetch

async function getPokeSprites(pokeName) {
  // console.log("this is array of pokeNames inside pokeSprites", pokeName);
  document.querySelector(".pokeEvos").innerHTML = "";
  for (let i = 0; i < pokeName.length; i++) {
    // console.log(pokeName[i]);

    let resPoke = await fetch(
      "https://pokeapi.co/api/v2/pokemon/" + pokeName[i]
    );
    let dataPoke = await resPoke.json();
    let p = document.createElement("p");
    let div = document.createElement("div");
    let img = document.createElement("img");

    document
      .querySelector(".pokeEvos")
      .insertAdjacentElement("afterend", img)
      .appendChild(p);

    img.src = dataPoke.sprites.front_default;
    p.innerText = "text";
  }

  // let res = await fetch(url);
  // let data = await res.json();
  // console.log("this is data inside pokesprites", data);
}

async function getPokeNames() {
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

  let arrayOfNames = [evoBegin.species.name];

  let nextEvo = evoBegin.evolves_to;

  // const spreadEvolves = [...nextEvo];
  // console.log("this is spreadEvolves", spreadEvolves);

  while (nextEvo.length > 0) {
    arrayOfNames.push(...nextEvo.map((poke) => poke.species.name));

    nextEvo = nextEvo[0].evolves_to;
  }
  getPokeSprites(arrayOfNames);
}
