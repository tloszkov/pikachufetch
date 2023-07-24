function Locations({ id, onClick, name }) {
    // const id = props.id;
    // const onClick = props.onClick;
    // const name = props.name;

    return (<button id={id} onClick={onClick}>{name}</button>)
}

export default Locations;