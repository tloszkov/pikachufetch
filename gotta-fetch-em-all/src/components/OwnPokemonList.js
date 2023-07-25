function OwnPokemonList({ name, onClick, id}) {
    return (
      <div className="OwnPokemon">
        <button onClick={onClick} id={id}>
          {name}
        </button>
      </div>
    );
}

export default OwnPokemonList;
