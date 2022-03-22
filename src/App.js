import { useState } from "react";

import uuid from "react-uuid";

import useTitle from "./hooks/useTitle";


import Panel from "./components/Panel";
import Menu from "./components/Menu";
import List from "./components/List";
import Item from "./components/Item";
import Editor from "./components/Editor";
import Preview from "./components/Preview";

import './App.css'


function App() {

    const [ items, setItems ] = useState([])
    const [ copyItems, setCopyItems ] = useState([])
    const [ actualIndex, setActualIndex ] = useState(-1)

    useTitle( copyItems[actualIndex]?.title, 'Notes' )


    const handleNew = () =>{
        const note = {
            id: uuid(),
            title: '',
            text: '',
            pinned: false,
            created: Date.now()
        }

        let notes = [ ...items ]
        notes.unshift( note )

        const res = getOrderedNotes( notes )

        setItems(res)
        setCopyItems(res)
    }

    const handlePinned = ( item, index ) => {

        console.log( index );
        setActualIndex( index )

        let id = item.id


        let notes
        if( items.length === copyItems.length ){
            notes = [ ...items ]
        }else{
            notes = [ ...copyItems ]
        }

        notes[index].pinned = !notes[index].pinned
        let res = getOrderedNotes( notes )



        if( items.length === copyItems.length ){
                setItems( res )
                setCopyItems(res)
        }else{
                setCopyItems(res)
        }


        let newIndex = res.findIndex( item => item.id === id ) 
        

        setActualIndex( newIndex )


    }

    const getOrderedNotes = ( arr ) =>{
        let items = [ ...arr ]

        let pinned = items.filter( item => item.pinned )
        let rest = items.filter( item => !item.pinned )

        pinned = sortByDate( pinned, true )
        rest = sortByDate( rest, true )

        return [ ...pinned, ...rest ]
    }

    const sortByDate = ( arr, asc = false ) => {
        if( asc ){
            return arr.sort( (a,b) => new Date( b.created ) - new Date( a.created ) ) 
        }else{
            return arr.sort( (a,b) => new Date( a.created ) - new Date( b.created ) ) 
        }
    }



    const HandleSelectNote = (item, e) => {
        if( !e.target.classList.contains('note') ){
            return
        }
        const index = copyItems.findIndex( n => n === item )

        if( actualIndex === index ){
            return
        }

        setActualIndex( index )
    }

    const onChangeTitle = (e) =>{
        const title = e.target.value

        let notes = [ ...items ]
        notes[actualIndex].title = title

        setItems( notes )
        setCopyItems( notes )
        
    }

    const onChangeText = (e) =>{
        const text = e.target.value

        let notes = [ ...items ]
        notes[actualIndex].text = text

        setItems( notes )
        setCopyItems( notes )
    }
    
    const handleSearch = ( e ) =>{
        const query = (e.target.value).toLowerCase().trim()

        if( query.trim() === '' ){
            const itemOrdenados = getOrderedNotes( [...items] )
            setCopyItems( itemOrdenados )
            
        }else{
            let res = items.filter( item => ( item.title.toLowerCase() ).includes( query ) || (item.text.toLowerCase()).includes( query )  )

            if( res.length === 0 ){
                setActualIndex( -1 )
                setCopyItems( [] )
            }else{
                setCopyItems( res )
                setActualIndex( 0 )
            }
        }

    }

    return (
        <div className="App container">
            <Panel >
                <Menu onNew={ handleNew } onSearch={ handleSearch } />
                <List>
                    { copyItems.map( (item, idx) => {
                        return <Item 
                            key={ item.id }
                            item={ item } 
                            index={ idx }
                            onHandlePinned={ handlePinned }
                            onHandleSelectNote={ HandleSelectNote }
                            actualIndex={ actualIndex } />
                    } )}
                </List>
            </Panel>
            <>
            {
                actualIndex >= 0 &&
                <>
                    <Editor item={ copyItems[actualIndex] } onChangeTitle={ onChangeTitle } onChangeText={ onChangeText } />
                    <Preview text={ copyItems[actualIndex].text } />
                </>
            }
            </>
        </div>
    );
}

export default App;
