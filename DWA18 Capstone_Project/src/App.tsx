import React from 'react'
import { useState } from 'react'
import Navbar from './components/Navbar'
import ShowPreviews from './components/ShowPreviews'
import LoadingBar from './components/Loading'
import Episode from './components/Episode'
import './App.css'

export default function App() {
  const [state, setState] = useState({
    phase: 'SHOWS',
    shows: [],
    episode: [],
  })

  /**
   * Initial API call for the array of shows to be used to preview on Landing Page
   */
  React.useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then(res => res.json())
      .then(data => setState((prevState) => ({
        ...prevState,
        shows: data,
      })))
  }, [])

  /**
   * When show is selected / clicked on the fuction takes the ID from the show and 
   * uses the ID to fetch the single episode data from API
   * Once API has been fetched the phase changes 
   */
  const episodeData = (id: string) => {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then(res => res.json())
      .then(data => setState((prevState) => ({
        ...prevState,
        episode: data,
      })))

    setState(prevState => ({
      ...prevState,
      phase: 'EPISODE'
    }))
  }


  const showsPreview = (props: {
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
        <ShowPreviews
          key={show.id}
          id={show.id}
          title={show.title}
          description={show.description}
          image={show.image}
          updated={show.updated}
          seasons={show.seasons}
          episodeChange={episodeData}
        />
      ))
    }
  }

  const episodePreview = (props) => {
    if (props.length === 0) {
      return <LoadingBar />
    } else {
      return (
        <Episode
          key={props.id}
          id={props.id}
          title={props.title}
          description={props.description}
          image={props.image}
          updated={props.updated}
          seasons={props.seasons}
          genres={props.genres}
        />
      )
    }
  }
  const showPreviewCards = showsPreview(state.shows)
  const showEpisode = episodePreview(state.episode)

  return (
    <>
      <div className='nav-container'>
        <Navbar />
      </div>
      <div className='main-container'>
        {state.phase === 'EPISODE' ? showEpisode : showPreviewCards}
      </div>
    </>
  )
}