import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import Locations from './components/Locations';
import ListOfPokemons from './components/ListOfPokemons';
import Area from './components/Area';

function App() {

  const [locations, setLocations] = useState([]);
  const [area, setArea] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  const [pokemonSprite, setPokemonSprite] = useState(``);
  const [isLocationSelected, setIsLocationSelected] = useState(false);
  const [isAreaSelected, setIsAreaSelected] = useState(false);

  useEffect(() => {

    fetch('https://pokeapi.co/api/v2/location')
      .then(res => res.json())
      .then(data => {
        const fetchedData = data.results
        setLocations(fetchedData)
      })
      .catch(error => console.log("ERROR"))
  }, []);


  const fetchingLocation = (url) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const fetchedData = data.areas;
        setArea(fetchedData);
        // console.log("fetchedData:", data.areas)
      })
      .catch(error => console.log("ERROR"))
  }

  const fetchingPokemonSprite = (url) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const fetchedPokemonSprite = data.sprites.back_default;
        setPokemonSprite(fetchedPokemonSprite);
        console.log("fetchedPokemonSprite:", fetchedPokemonSprite);
      })
      .catch(error => console.log("ERROR"))

  }

  const fetchingPokemon = (url) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const fetchedPokemonName = data.pokemon_encounters[getRandomPokemon(data.pokemon_encounters.length)].pokemon.name;
        fetchingPokemonSprite(data.pokemon_encounters[getRandomPokemon(data.pokemon_encounters.length)].pokemon.url);
        setPokemon(fetchedPokemonName);
        console.log("fetchedPokemonName:", fetchedPokemonName);
      })
      .catch(error => console.log("ERROR"))
  }

  const moveToLocation = (event) => {
    const locationUrl = locations[event.target.id].url;
    // console.log("locationUrl:", locationUrl);
    fetchingLocation(locationUrl);
    //console.log(area);
    setIsLocationSelected(true);
  }

  const moveToPokemon = (event) => {
    const pokemonUrl = area[event.target.id].url;
    fetchingPokemon(pokemonUrl);
    console.log("pokemonUrl:", pokemonUrl);
    console.log("Pokemon list:", pokemon);
    setIsAreaSelected(true);
  }

  function getRandomPokemon(number) {
    return Math.floor(Math.random() * number);
  }

  function backToLocations() {
    setIsLocationSelected(false);
  }

  return (
    <div className="App">
      {!isLocationSelected ? (
        locations.map((item, index) => {
          return <Locations
            id={index}
            key={index}
            onClick={moveToLocation}
            name={item.name} />
        })
      ) :
        <>
          {!isAreaSelected ? (<div>
            {area.map((item, index) => {
              console.log(item)
              return <Area
                id={index}
                key={index}
                onClick={moveToPokemon}
                name={item.name}
              />
            })}
            <button onClick={backToLocations}>Back</button>
          </div>) :
            (<ListOfPokemons
              id={pokemon}
              key={pokemon}
              name={pokemon}
              url={pokemonSprite}
              />
            )}
        </>
      }
    </div>
  );
}

export default App;