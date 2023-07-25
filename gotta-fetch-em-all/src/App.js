import "./App.css";
import React from "react";
import { useEffect, useState } from "react";
import Locations from "./components/Locations";
import ListOfPokemons from "./components/ListOfPokemons";
import Area from "./components/Area";
import OwnPokemonList from "./components/OwnPokemonList";
import OwnPokemon from "./components/OwnPokemon";

function App() {
  //Setting location and area states
  const [locations, setLocations] = useState([]);
  const [area, setArea] = useState([]);
  const [isAreaSelected, setIsAreaSelected] = useState(false);
  const [isLocationSelected, setIsLocationSelected] = useState(false);

  //State in case an area does not cotani a pokemon
  const [emptyPokemon, setEmptyPokemon] = useState(false);

  // Enemy pokemon dataset and pictures
  const [pokemon, setPokemon] = useState([]);
  const [pokemonSprite, setPokemonSprite] = useState(``);

  // const [enemyPokemon, setEnemyPokemon] = useState({
  //   name: "",
  //   url: "",
  //   spriteUrl: "",
  //   hp: 0,
  //   attack: 0,
  //   defense: 0
  // });
  const [enemyPokemon, setEnemyPokemon] = useState([]);
  
  //Own pokemon dataset and pictures
  const [ownPokemonSprite, setOwnPokemonSprite] = useState(``);
  const [isOwnPokemonSelected, setIsOwnPokemonSelected] = useState(false);
  const [ownPokemon, setOwnPokemon] = useState([
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/bulbasaur",
      spriteUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      hp: 45,
      attack: 49,
      defense: 49,
    },
    {
      name: "charizard",
      url: "https://pokeapi.co/api/v2/pokemon/charizard",
      spriteUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
      hp: 178,
      attack: 84,
      defense: 78,
    },
    {
      name: "poliwhirl",
      url: "https://pokeapi.co/api/v2/pokemon/poliwhirl",
      spriteUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/61.png",
      hp: 65,
      attack: 65,
      defense: 65,
    },
  ]);

  // Fetching the main PokeApi dataset for Locations
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/location")
      .then((res) => res.json())
      .then((data) => {
        const fetchedData = data.results;
        setLocations(fetchedData);
      })
      .catch((error) => console.log("ERROR"));
  }, []);

  // Fetching locations function for Areas
  const fetchingLocation = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const fetchedData = data.areas;
        setArea(fetchedData);
      })
      .catch((error) => console.log("ERROR"));
  };

  // Fetching BACK perspective pictures
  const fetchingPokemonBackSprite = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const fetchedPokemonSprite = data.sprites.back_default;
        // SpriteUrl HP,ATTACK,DEFENSE
        // enemyPokemon.spriteUrl = data.sprites.front_default;
        // enemyPokemon.hp = data.stats[0].base_stat;
        // enemyPokemon.attack = data.stats[1].base_stat;
        // enemyPokemon.defense = data.stats[2].base_stat;
        // // ------------------------------
        setPokemonSprite(fetchedPokemonSprite);
        setEnemyPokemon({ name: data.name,
                          url: `https://pokeapi.co/api/v2/pokemon/${data.name}`,
                          spriteUrl: data.sprites.front_default,
                          hp: data.stats[0].base_stat,
                          attack: data.stats[1].base_stat,
                          defense: data.stats[2].base_stat,        
        });
      })
      .catch((error) => console.log("ERROR"));
  };

  // Fetching FRONT perspective pictures
  const fetchingOwnPokemonFrontSprite = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const fetchedPokemonFrontSprite = data.sprites.front_default;
        setOwnPokemonSprite(fetchedPokemonFrontSprite);
      })
      .catch((error) => console.log("ERROR"));
  };

  // Fetching enemy pokemons
  const fetchingPokemon = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //If the area contain pokemons
        if (data.pokemon_encounters.length !== 0) {
          const fetchedPokemonName = data.pokemon_encounters[getRandomPokemon(data.pokemon_encounters.length)].pokemon.name;
          fetchingPokemonBackSprite(data.pokemon_encounters[getRandomPokemon(data.pokemon_encounters.length)].pokemon.url);
          console.log("Enemy pokemon:",enemyPokemon);
          setPokemon(fetchedPokemonName);

          // Enemy data savings NAME AND URL
          // enemyPokemon.name = fetchedPokemonName;
          // enemyPokemon.url = `https://pokeapi.co/api/v2/pokemon/${fetchedPokemonName}`;
          // -------------------------------------------------------
        } else {
          setEmptyPokemon(true);
        }
      })
      .catch((error) => console.log("ERROR"));
  };

  // Funciton for LOCATION buttons
  const moveToLocation = (event) => {
    const locationUrl = locations[event.target.id].url;
    fetchingLocation(locationUrl);
    setIsLocationSelected(true);
    setIsAreaSelected(false);
    setIsOwnPokemonSelected(false);
  };

  // Function for POKEMON selection
  const moveToPokemon = (event) => {
    const pokemonUrl = area[event.target.id].url;
    fetchingPokemon(pokemonUrl);
    setIsAreaSelected(true);
  };

  // Random number creation based on (array length)
  function getRandomPokemon(number) {
    return Math.floor(Math.random() * number);
  }

  //BACK button function
  function backToLocations() {
    setIsLocationSelected(false);
  }

  //Battle function after selecting Own pokemon
  function startBattle(event) {
    // Filtering selected OwnPokemon URL
    const selectedOwnPokemonUrl = ownPokemon.filter((element) =>
      event.target.id === element.name ? element.url : null);
    fetchingOwnPokemonFrontSprite(selectedOwnPokemonUrl[0].url);
    setIsOwnPokemonSelected(true);

    // Creating teh selectedPokemon variable    
    const selectedOwnPokemon = ownPokemon.filter((element) => {
      if (element.name === event.target.id) {
        return element;
      }
    });
    console.log("Own hp:", selectedOwnPokemon[0].hp);
    console.log("Enemy hp:", enemyPokemon.hp);

    // ((((2/5+2)*B*60/D)/50)+2)*Z/255, where B is the attacker's Attack,
    // D is defender's Defense, and Z is a random number between 217 and 255.

    // ENEMY stats
    const enemyB = enemyPokemon.attack;
    const enemyD = selectedOwnPokemon[0].defense;
    const enemyZ = Math.floor(Math.random() * 39 + 217);
    console.log("file: App.js:185 ~ startBattle ~ enemyZ:", enemyZ);

    //ENEMY DAMAGE
    const enemyDamage =
      Math.floor((((((2 / 5 + 2) * enemyB * 60) / enemyD / 50 + 2) * enemyZ) / 255) * 100) / 100;
    console.log("file: App.js:185 ~ startBattle ~ enemyDamage:", enemyDamage);

    // OWN stats
    const ownB = enemyPokemon.attack;
    const ownD = selectedOwnPokemon[0].defense;
    const ownZ = Math.floor(Math.random() * 39 + 217);
    console.log("file: App.js:191 ~ startBattle ~ ownZ:", ownZ);

    //OWN DAMAGE
    const ownDamage =
      Math.floor((((((2 / 5 + 2) * ownB * 60) / ownD / 50 + 2) * ownZ) / 255) * 100) / 100;
      console.log("file: App.js:191 ~ startBattle ~ ownDamage:", ownDamage);

      
    // BATTLE LOGIC
      console.log("Own side:", selectedOwnPokemon[0].hp / enemyDamage);
      console.log("Enemy side:", enemyPokemon.hp / ownDamage);

    if (enemyPokemon.hp / ownDamage > selectedOwnPokemon[0].hp / enemyDamage) {
      console.log("Enemy win");
      setIsLocationSelected(false);
      console.log(enemyPokemon);
    } else {
      console.log("Own win");

      console.log(enemyPokemon);
      const updatedPokemon = [...ownPokemon,enemyPokemon];
      setOwnPokemon(updatedPokemon);

      console.log(updatedPokemon);

      setIsLocationSelected(false);
    }
  }

  return (
    <div className="App">
      {!isLocationSelected ? (
        locations.map((item, index) => {
          return (
            <Locations
              id={index}
              key={index}
              onClick={moveToLocation}
              name={item.name}
            />
          );
        })
      ) : (
        <>
          {!isAreaSelected ? (
            <div>
              {area.map((item, index) => {
                return (
                  <Area
                    id={index}
                    key={index}
                    onClick={moveToPokemon}
                    name={item.name}
                  />
                );
              })}
              <button onClick={backToLocations}>Back</button>
            </div>
          ) : !emptyPokemon ? (
            <div>
              <ListOfPokemons
                id={pokemon}
                key={pokemon}
                name={pokemon}
                url={pokemonSprite}
              />
              {!isOwnPokemonSelected ? (
                ownPokemon.map((pokemon, index) => {
                  return (
                    <>
                      <OwnPokemonList
                        key={index}
                        id={pokemon.name}
                        name={pokemon.name}
                        onClick={startBattle}
                        url={pokemon.spriteUrl}
                      />
                    </>
                  );
                })
              ) : (
                <>
                  <OwnPokemon url={ownPokemonSprite} />
                </>
              )}
            </div>
          ) : (
            <>
              <h2>This location doesn't seem to have any pokémon</h2>
              <button onClick={backToLocations}>Back to Locations</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
