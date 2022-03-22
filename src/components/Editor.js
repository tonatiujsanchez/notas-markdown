

const Editor = ({ item, onChangeTitle, onChangeText }) => {


    const handleTitleChange = ( e ) =>{
        onChangeTitle(e)
    }

    const handleTextChange = ( e ) =>{
        onChangeText(e)
    }

    return (
        <div className="editor">
            <div>
                <input type="text" className="title" value={ item.title } onChange={ handleTitleChange } />
            </div>
            <div className="editor-textarea">
                <textarea className="content" value={ item.text } onChange={ handleTextChange }></textarea>
            </div>
        </div>
    )
}

export default Editor