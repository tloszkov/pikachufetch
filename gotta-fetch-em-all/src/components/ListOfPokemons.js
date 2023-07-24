function ListOfPokemons(props) {
    const name = props.name
    const link = props.link
    const id = props.id

   return  <div id={id} className="Pokemon">
    <h2>{name}</h2>
    <img src={link} alt={name}/>
   </div>
}

export default ListOfPokemons;

