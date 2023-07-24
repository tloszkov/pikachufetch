function ListOfPokemons({ name, url, id }) {

    return (<div id={id} className="Pokemon">
        <h2>{name}</h2>
        <img src={url} alt={name} />
    </div>);
};

export default ListOfPokemons;

