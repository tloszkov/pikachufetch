import "./App.css";
import React from "react";
import { useEffect, useState } from "react";
import Locations from "./components/Locations";
import ListOfPokemons from "./components/ListOfPokemons";
import Area from "./components/Area";
import OwnPokemonList from "./components/OwnPokemonList";
import OwnPokemon from "./components/OwnPokemon";

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
      name: "bullbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/bulbasaur",
    },
    {
      name: "charizard",
      url: "https://pokeapi.co/api/v2/pokemon/charizard",
    },
    {
      name: "poliwhirl",
      url: "https://pokeapi.co/api/v2/pokemon/poliwhirl",
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
        //console.log("file: App.js:73 ~ .then ~ setOwnPokemonSprite:", ownPokemonSprite);
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
          console.log("fetchedPokemonName:", fetchedPokemonName);
        } else {
          setEmptyPokemon(true);
        }
      })
      .catch((error) => console.log("ERROR"));
  };

  const moveToLocation = (event) => {
    const locationUrl = locations[event.target.id].url;
    // console.log("locationUrl:", locationUrl);
    fetchingLocation(locationUrl);
    //console.log(area);
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
    console.log(
      "file: App.js:126 ~ startBattle ~ selectedOwnPokemonUrl:",
      selectedOwnPokemonUrl[0].url
    );
    fetchingOwnPokemonFrontSprite(selectedOwnPokemonUrl[0].url);
    setIsOwnPokemonSelected(true);
    // console.log(ownPokemonSprite);
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
