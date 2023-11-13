import React from 'react'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Shows from './components/Shows'
import LoadingBar from './components/Loading'
import Episode from './components/Episode'
import LandingCarousel from './components/Carousel'
import generateCode from './utils/keygen'
import SortBar from './components/SortBar'
import './App.css'

export default function App() {
  const [state, setState] = useState({
    phase: 'SHOWS',
    shows: [],
    episode: [],
    carousel: [],
  })


  /**
   * Creates first array of Data for carousel dependency on the shows array
   */
  React.useEffect(() => {
    const shuffled = [...state.shows].sort(() => 0.5 - Math.random());
    setState((prevState) => ({
      ...prevState,
      carousel: shuffled.slice(0, 11)
    }))
  }, [state.shows])

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
        <Shows
          key={generateCode(16)}
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
          key={generateCode(16)}
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

  const carouselPreview = (props) => {
    if (props.length === 0) {
      return <LoadingBar />
    } else {
      return (
        <LandingCarousel
          data={props}
        />
      )
    }
  }



  const showPreviewCards = showsPreview(state.shows)
  const showEpisode = episodePreview(state.episode)
  const showCarousel = carouselPreview(state.carousel)

  console.log(state.shows)

  return (
    <>
      <div className='nav-container'>
        <Navbar />
      </div>
      <div>
        {state.phase === 'SHOWS' ? showCarousel : ''}
        <SortBar />
      </div>
      <div className='main-container'>
        {state.phase === 'EPISODE' ? showEpisode : showPreviewCards}
      </div>
    </>
  )
}