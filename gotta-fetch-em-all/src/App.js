import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import Locations from './components/Locations';
import ListOfPokemons from './components/ListOfPokemons';

function App() {

  const [locations, setLocations] = useState([]);
  const [area, setArea] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  const [isLocationSelected, setIsLocationSelected] = useState(false);
  const [isAreaSelected, setIsAreaSelected] = useState(false)

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
        console.log("fetchedData:", data.areas)
      })
      .catch(error => console.log("ERROR"))
  }

  // const fetchingPokemonSprite (url) => {
  //   fetch(url)
  //     .then(res => res.json())
  //     .then(data => {
  //       const fetchedPokemonSprite = data;
  //       setPokemon(fetchedPokemon);
  //       console.log("fetchedPokemon:", fetchedPokemon)
  //     })
  //     .catch(error => console.log("ERROR"))

  // }

  const fetchingPokemon = (url) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const fetchedPokemon = data.pokemon_encounters[getRandomPokemon(data.pokemon_encounters.length)].pokemon.name;
        // Todo fetchingPokemonSprite(data.pokemon_encounters[getRandomPokemon(data.pokemon_encounters.length).pokemon.url)
        setPokemon(fetchedPokemon);
        console.log("fetchedPokemn:", fetchedPokemon)
      })
      .catch(error => console.log("ERROR"))
  }

  // location.areas[rand].url ->
  // let area = fetch("https://pokeapi.co/api/v2/location-area/1/")
  // area.pokemon_encounters[rand].pokemon.url

  const moveToLocation = (event) => {
    console.log(event.target.id);
    const locationUrl = locations[event.target.id].url;
    console.log("locationUrl:", locationUrl);
    fetchingLocation(locationUrl);
    console.log(area);
    setIsLocationSelected(true);

  }

  const moveToPokemon = (event) => {
    console.log(event.target.id);
    const pokemonUrl = area[event.target.id].url;
    fetchingPokemon(pokemonUrl);
    console.log("pokemonUrl:", pokemonUrl);
    console.log("Pokemon list:",pokemon);
    setIsAreaSelected(true);
  }

  function getRandomPokemon(number) {
    return Math.floor(Math.random() * number)
  }

  function backToLocations() {
    setIsLocationSelected(false)
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
            return <button
              id={index}
              key={index}
              onClick={moveToPokemon}
            >{item.name}</button>
          })}
          <button onClick={backToLocations}>Back</button>
        </div>) :
         (
          pokemon.map((item,index)=>{
          <ListOfPokemons
            id= {index}
            key={index}
            name={item.name}
            url={item.url}
          >
          </ListOfPokemons>
          })
         )}
        </>
      }
    </div>
  );
}

export default App;
