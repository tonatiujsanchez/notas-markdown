import { useEffect } from "react"


const useTitle = ( text, defaultValue ) => {
  

    useEffect(()=>{
        document.title = text ? text : defaultValue
    })

    return (
    <div>useTitle</div>
  )
}

export default useTitle