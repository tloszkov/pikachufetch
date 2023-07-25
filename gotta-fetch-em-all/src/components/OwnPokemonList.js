function OwnPokemonList({ name, onClick, id, url }) {
  return (
    <div className="OwnPokemon">
      <button onClick={onClick} id={id}>
        {name}
      </button>
      <img style={{width:100,height:100}} src={url} alt={"pokemon"}/>
    </div>
  );
}

export default OwnPokemonList;
