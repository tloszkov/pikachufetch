function Area({ id, onClick, name }) {

    return <button id={id} onClick={onClick}>{name}</button>
}

export default Area;