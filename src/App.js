
// import {useEffect} from 'react'

// function App(){

//   useEffect(()=>{
//     const fetchData = async () =>{

//       try{

//         const url = 'https://api.gyanibooks.com/search_publication/'
//         const options = {
//           method:"POST",
//           headers: { 
//             'Content-Type': 'application/json'
//           },
//           body:JSON.stringify({
//             "keyword": "ai",
//             "limit": "10"
//           })
//         }

//         const response = await fetch(url, options)
//         const data = await response.json()
//         console.log(data)

//       }
//       catch(error){
//         console.log(error)
//       }

//     }

//     fetchData()
//   }, [])

//   return(
//     <div>
      
//     </div>
//   )

// }

// export default App


import {BrowserRouter, Route, Routes} from "react-router-dom"
import SearchInputWithToggle from "./components/Search"
import SearchResults from "./components/SearchResults"

const App = ()=>{
  return(
    <BrowserRouter>
      <Routes>
        <Route>
          <Route exact path="/" element={<SearchInputWithToggle/>}/>
          <Route exact path="/searchResult" element={<SearchResults/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

