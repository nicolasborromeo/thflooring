
function SearchBar() {
    return (
        <form id="search-form">
            <input
                type="text"
                name="descripcion"
                placeholder="Search..."
                className="search-input"
            />
            <select name="orderBy">
                <option value="null">Ordenar por...</option>
                <option value="descripcion">Descripcion</option>
                <option value="precio">Precio</option>
                <option value="costo">Costo</option>
                <option value="company">Marca</option>
            </select>
            <select name="direction" className="order-select">
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>
            <button type="submit" className="search-button" id="search-button">
                Search
            </button>
        </form>
    );
}

export default SearchBar;
