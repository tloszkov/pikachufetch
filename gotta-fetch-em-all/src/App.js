import "./App.css";
import React from "react";
import { useEffect, useState } from "react";
import Locations from "./components/Locations";
import ListOfPokemons from "./components/ListOfPokemons";
import Area from "./components/Area";
import OwnPokemonList from "./components/OwnPokemonList";
import OwnPokemon from "./components/OwnPokemon";

let enemyPokemon = {
  name: "",
  url: "",
  spriteUrl: "",
  hp: 0 ,
  attack: 0,
  defense: 0
}
function App() {
  const [locations, setLocations] = useState([]);
  const [area, setArea] = useState([]);
  const [isAreaSelected, setIsAreaSelected] = useState(false);
  const [isLocationSelected, setIsLocationSelected] = useState(false);

  const [emptyPokemon, setEmptyPokemon] = useState(false);

  const [pokemon, setPokemon] = useState([]);
  const [pokemonSprite, setPokemonSprite] = useState(``);

  const [ownPokemonSprite, setOwnPokemonSprite] = useState(``);
  const [isOwnPokemonSelected, setIsOwnPokemonSelected] = useState(false);
  const [ownPokemon, setOwnPokemon] = useState([
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/bulbasaur",
      spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      hp: 45,
      attack:49,
      defense:49
    },
    {
      name: "charizard",
      url: "https://pokeapi.co/api/v2/pokemon/charizard",
      spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
      hp: 78,
      attack: 84,
      defense: 78
    },
    {
      name: "poliwhirl",
      url: "https://pokeapi.co/api/v2/pokemon/poliwhirl",
      spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/61.png",
      hp: 65,
      attack: 65,
      defense: 65
    },
  ]);


  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/location")
      .then((res) => res.json())
      .then((data) => {
        const fetchedData = data.results;
        setLocations(fetchedData);
      })
      .catch((error) => console.log("ERROR"));
  }, []);

  const fetchingLocation = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const fetchedData = data.areas;
        setArea(fetchedData);
        // console.log("fetchedData:", data.areas)
      })
      .catch((error) => console.log("ERROR"));
  };

  const fetchingPokemonBackSprite = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const fetchedPokemonSprite = data.sprites.back_default;
        // SpriteUrl HP,ATTACK,DEFENSE
        enemyPokemon.spriteUrl = data.sprites.front_default;
        enemyPokemon.hp = data.stats[0].base_stat;
        enemyPokemon.attack = data.stats[1].base_stat;
        enemyPokemon.defense = data.stats[2].base_stat;
        // ------------------------------
        setPokemonSprite(fetchedPokemonSprite);
        console.log("fetchedPokemonSprite:", fetchedPokemonSprite);
      })
      .catch((error) => console.log("ERROR"));
  };

  const fetchingOwnPokemonFrontSprite = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const fetchedPokemonFrontSprite = data.sprites.front_default;
        console.log(
          "file: App.js:71 ~ .then ~ fetchedPokemonFrontSprite:",
          fetchedPokemonFrontSprite
        );
        setOwnPokemonSprite(fetchedPokemonFrontSprite);
      })
      .catch((error) => console.log("ERROR"));
  };

  const fetchingPokemon = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.pokemon_encounters.length !== 0) {
          const fetchedPokemonName =
            data.pokemon_encounters[
              getRandomPokemon(data.pokemon_encounters.length)
            ].pokemon.name;
          fetchingPokemonBackSprite(
            data.pokemon_encounters[
              getRandomPokemon(data.pokemon_encounters.length)
            ].pokemon.url
          );
          setPokemon(fetchedPokemonName);

          // enemy data savings NAME AND URL
          enemyPokemon.name = fetchedPokemonName;
          enemyPokemon.url = `https://pokeapi.co/api/v2/pokemon/${fetchedPokemonName}`
          // -------------------------------------------------------

          console.log("fetchedPokemonName:", fetchedPokemonName);
        } else {
          setEmptyPokemon(true);
        }
      })
      .catch((error) => console.log("ERROR"));
  };

  const moveToLocation = (event) => {
    const locationUrl = locations[event.target.id].url;
    fetchingLocation(locationUrl);
    setIsLocationSelected(true);
  };

  const moveToPokemon = (event) => {
    const pokemonUrl = area[event.target.id].url;
    fetchingPokemon(pokemonUrl);
    console.log("pokemonUrl:", pokemonUrl);
    console.log("Pokemon list:", pokemon);
    setIsAreaSelected(true);
  };

  function getRandomPokemon(number) {
    return Math.floor(Math.random() * number);
  }

  function backToLocations() {
    setIsLocationSelected(false);
  }

  function startBattle(event) {
    console.log(event.target.id);
    const selectedOwnPokemonUrl = ownPokemon.filter((element) =>
      event.target.id === element.name ? element.url : null
    );
    fetchingOwnPokemonFrontSprite(selectedOwnPokemonUrl[0].url);
    setIsOwnPokemonSelected(true);

    const selectedOwnPokemon = ownPokemon.filter((element)=>{
      if (element.name === event.target.id){
        return element
      }
    })
    console.log("Own hp:", selectedOwnPokemon[0].hp)
    console.log("Enemy hp:",enemyPokemon.hp);
    // ((((2/5+2)*B*60/D)/50)+2)*Z/255, where B is the attacker's Attack, 
    // D is defender's Defense, and Z is a random number between 217 and 255.


      
      const enemyB = enemyPokemon.attack;
      const enemyD = selectedOwnPokemon[0].defense;
      const enemyZ = Math.floor((Math.random() * 38)+217);
      const enemyDamage=(Math.floor(((((2/5+2)*enemyB*60/enemyD)/50)+2)*enemyZ/255*100)/100);
      console.log("file: App.js:185 ~ startBattle ~ enemyDamage:", enemyDamage)
      const ownB = enemyPokemon.attack;
      const ownD = selectedOwnPokemon[0].defense;
      const ownZ = Math.floor((Math.random() * 38)+217);
      const ownDamage=(Math.floor(((((2/5+2)*ownB*60/ownD)/50)+2)*ownZ/255*100)/100);
      console.log("file: App.js:191 ~ startBattle ~ ownDamage:", ownDamage)
      console.log("Enemy side:",enemyPokemon.hp/ownDamage);
      console.log("Own side:",ownPokemon[0].hp/enemyDamage);



      if ((enemyPokemon.hp/ownDamage)>(ownPokemon[0].hp/enemyDamage)){
        console.log("Enemy win");
      }else 
      {
        console.log("Own win");
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
                console.log(item);
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
                    <OwnPokemonList
                      key={index}
                      id={pokemon.name}
                      name={pokemon.name}
                      onClick={startBattle}
                      url={pokemon.spriteUrl}
                    />
                  );
                })
              ) : (
                <OwnPokemon
                  url={ownPokemonSprite}
                />
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
