import './App.css';
import React from 'react';
import {useEffect,useState} from 'react';




const dataFetch = async () => {
  try {
    const data = await fetch('https://pokeapi.co/api/v2/location');
    const fetchedData = await data.json();
    console.log("fetchedData:", fetchedData.results)
  } catch (error) {
    console.log("Error during data fetching:", error);
    
  }
};

function App() {

  const [locations, setLocations] = useState([]);
  
  useEffect(() => {

    setLocations(dataFetch());
    console.log("Locations", locations);
  }, []);

  return (
    <div className="App">
      <div>Gotta fetch em all!</div>
      <div>Try!</div>
    </div>
  );
}

export default App;
