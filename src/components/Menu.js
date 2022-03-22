
const Menu = ({ onNew, onSearch }) => {

    const handleClick = () =>{
        onNew()
    }
    const handleChange = ( e ) => {
        onSearch( e )
    }
    return (
        <div className="menu">
            <input type="text" className="search" placeholder="buscar" onChange={ handleChange } />
            <button className="btn" onClick={() => handleClick()}>+ Nueva Nota</button>
        </div>
    )
}

export default Menu