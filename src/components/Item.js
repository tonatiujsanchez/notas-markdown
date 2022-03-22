

const Item = ({ item, index, onHandlePinned, onHandleSelectNote, actualIndex }) => {

    const handlePinned = (item, index) =>{
        onHandlePinned( item, index )
    }

    const handleClick = (item, e) =>{
        onHandleSelectNote(item, e)
    }

    return (
        <div key={item.id} className={ index === actualIndex ? 'note activeNote' : 'note' } onClick={ ( e )=> handleClick( item, e ) }>
            <div>
                {item.title === '' ? '[Sin Título]' : item.title.substring(0, 20)}
            </div>
            <div>
                <button className="pinButton" onClick={ () => handlePinned(item, index) } >{item.pinned ? 'Pinned' : 'Pin'}</button>
            </div>
        </div>
    )
}

export default Item