import React from 'react'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Shows from './components/Shows'
import LoadingBar from './components/Loading'
import Episode from './components/Episode'
import LandingCarousel from './components/Carousel'
import generateCode from './utils/keygen'
import SortingButtons from './components/SortBar'
import { dateUp, dateDown, titleDown, titleUp } from './utils/sorting'
import './App.css'

export default function App() {

  const storedItems = JSON.parse(localStorage.getItem('storeStuff'))

  const [state, setState] = useState((storedItems) ? storedItems : {
    phase: 'SHOWS',
    shows: [],
    DisplayShows: [],
    episode: [],
    loadCarousel: false,
    carousel: [],
    favoriteShows: [],
  })

  React.useEffect(() => {
    localStorage.setItem('storeStuff', JSON.stringify(state))
  }, [state])


  const handleFavorite = (id: string) => {
    setState(prevState => ({
      ...prevState,
      shows: prevState.shows.map((show) => {
        return show.id === id ? { ...show, favorite: !show.favorite } : show
      })
    }))

    setState(prevState => ({
      ...prevState,
      favoriteShows: [...prevState.shows].map((show) => {
        return show.favorite === true ? show : undefined
      }).filter(item => item !== undefined)
    }))
  }

  console.log(state.favoriteShows)

  const handlePhase = () => {
    setState(prevState => ({
      ...prevState,
      phase: 'SHOWS'
    }))
  }
  const changePhase = () => {
    if (state.favoriteShows.length === 0) {
      return
    } else {
      setState(prevState => ({
        ...prevState,
        phase: 'FAVORITES'
      }))
    }
  }

  /**
   * Creates first array of Data for carousel dependency on the shows array
   */
  React.useEffect(() => {
    const shuffled = [...state.shows].sort(() => 0.5 - Math.random());
    setState((prevState) => ({
      ...prevState,
      carousel: shuffled.slice(0, 11),
    }))
  }, [state.loadCarousel])

  /**
   * Initial API call for the array of shows to be used to preview on Landing Page
   */
  React.useEffect(() => {
    if (storedItems) {
      return
    } else {
      fetch('https://podcast-api.netlify.app/shows')
        .then(res => res.json())
        .then(data => setState((prevState) => ({
          ...prevState,
          shows: data.map(item => ({
            ...item,
            favorite: false,
          })),
          loadCarousel: true,
          resetShows: false,
        })))
    }
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

  const sortAcending = () => {
    setState(prevState => ({
      ...prevState,
      shows: prevState.shows.sort(titleUp),
      favoriteShows: prevState.favoriteShows.sort(titleUp),
    }))
  }

  const sortDecending = () => {
    setState(prevState => ({
      ...prevState,
      shows: prevState.shows.sort(titleDown),
      favoriteShows: prevState.favoriteShows.sort(titleDown),
    }))
  }

  const sortDecendingDate = () => {
    setState(prevState => ({
      ...prevState,
      shows: prevState.shows.sort(dateDown),
      favoriteShows: prevState.favoriteShows.sort(dateDown),
    }))
  }

  const sortAcendingDate = () => {
    setState(prevState => ({
      ...prevState,
      shows: prevState.shows.sort(dateUp),
      favoriteShows: prevState.favoriteShows.sort(dateUp),
    }))
  }

  const resetShows = () => {
    fetch('https://podcast-api.netlify.app/shows')
      .then(res => res.json())
      .then(data => setState((prevState) => ({
        ...prevState,
        shows: data.map(item => ({
          ...item,
          favorite: false,
        })),
        loadCarousel: true,
        favoriteShows: [],
        phase: 'SHOWS'
      })))
  }

  const showsPreview = (props) => {
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
          toggleFav={handleFavorite}
          isFav={show.favorite}
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
          phase={handlePhase}
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

  const showSortingBar = (props) => {
    if (props.length === 0) {
      return <LoadingBar />
    } else {
      return (
        <SortingButtons
          down={sortDecending}
          up={sortAcending}
          reset={resetShows}
          dateDown={sortDecendingDate}
          dateUp={sortAcendingDate}
          phase={changePhase}
        />
      )
    }
  }

  const showPreviewCards = showsPreview(state.phase === 'FAVORITES' ? state.favoriteShows : state.shows)
  const showEpisode = episodePreview(state.episode)
  const showCarousel = carouselPreview(state.carousel)
  const showSortBar = showSortingBar(state.shows)

  return (
    <>
      <div className='nav-container'>
        <Navbar />
      </div>
      <div>
        {state.phase === 'SHOWS' || 'FAVORITE' ? showCarousel : ''}
        {state.phase === 'SHOWS' || 'FAVORITE' ? showSortBar : ''}
      </div>
      <div className='main-container'>
        {state.phase === 'EPISODE' ? showEpisode : showPreviewCards}
      </div>
    </>
  )
}