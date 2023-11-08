import React from 'react'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Main from './components/MainContent'
import LoadingBar from './components/Loading'
import './App.css'

export default function App() {
  const [state, setState] = useState({
    phase: '',
    shows: [],
    episodes: [],
  })

  React.useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then(res => res.json())
      .then(data => setState((prevState) => ({
        ...prevState,
        shows: data,
      })))
  }, [])

  const checkPreview = (props: {
    id: string
    title: string
    description: string
    seasons: number
    image: string
    genres: number[]
    updated: string
  }[]) => {
    if (props.length === 0) {
      return <LoadingBar />
    } else {
      return props.map((show) => (
        <Main
          key={show.id}
          title={show.title}
          description={show.description}
          image={show.image}
          updated={show.updated}
        />
      ))
    }
  }
  const mainCards = checkPreview(state.shows)



  return (
    <>
      <div className='nav-container'>
        <Navbar />
      </div>
      <div className='main-container'>
        {mainCards}
      </div>

      <div>
        <h1>this is where the footer will go</h1>
      </div>
    </>
  )
}


// {(state.phase === 'Loading') &&
//         <div>
//           <div>I am Loading...</div>
//           <button onClick={toggleState}>Change Phase</button>
//         </div>}
//       {(state.phase === 'Idle') && <div>
//         <div>I am Idling...</div>
//         <button onClick={toggleState}>Change Phase</button>
//       </div>}
//       {(state.phase === 'Filter') && <div>
//         <div>I am Filtering...</div>
//         <button onClick={toggleState}>Change Phase</button>
//       </div>}

// const toggleState = () => {
//   setState((prevState) => {
//     if (prevState.phase === 'Loading') {
//       return {
//         ...prevState,
//         phase: 'Idle'
//       }
//     } else if (prevState.phase === 'Idle') {
//       return {
//         ...prevState,
//         phase: 'Filter'
//       }
//     } else {
//       return {
//         ...prevState,
//         phase: 'Loading'
//       }
//     }
//   })
// }