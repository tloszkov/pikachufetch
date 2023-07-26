function Area({ id, onClick, name }) {

    return (
        <div className="area-button-container">
    <button id={id} onClick={onClick}>{name}</button>
        </div>
    );
}

export default Area;