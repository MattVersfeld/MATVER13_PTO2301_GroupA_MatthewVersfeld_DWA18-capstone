// @ts-nocheck
import React from 'react'
import { supabase } from './supabaseClient'
import Auth from './components/Auth';
import Account from './components/Account';
import Fuse from "fuse.js";
import { useState } from 'react'
import Navbar from './components/Navbar'
import Shows from './components/Shows'
import LoadingBar from './components/Loading'
import Episode from './components/Episode'
import LandingCarousel from './components/Carousel'
import generateCode from './utils/keygen'
import SortingButtons from './components/SortBar'
import MediaPlayer from './components/MediaPlayer';
import SignIn from './components/SignIn';
import { dateUp, dateDown, titleDown, titleUp, filterByGenre } from './utils/sorting'
import './App.css'

export default function App() {

  const storedItems = JSON.parse(localStorage.getItem('localStorage'))

  const [state, setState] = useState((storedItems) ? storedItems : {
    phase: 'SIGNIN',
    shows: [],
    DisplayShows: [],
    showDetails: {
      showData: [],
      showImage: '',
      showTitle: '',
      showDescription: '',
      showDate: '',
      seasonPick: '',
      episodes: [],
      displayEpisodes: [],
      displayImage: '',
    },
    loadCarousel: false,
    carousel: [],
    favoriteShows: [],
    showBackup: [],
    mediaPlayer: {
      mediaTitle: '',
      mediaFile: '',
      mediaImage: '',
    },
    isMediaPlaying: false,
    resetData: false,
  })

  React.useEffect(() => {
    localStorage.setItem('localStorage', JSON.stringify(state))
  }, [state])

  console.log(state)
  const [session, setSession] = useState(null)

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)

    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })


  }, [])

  React.useEffect(() => {
    if (session !== null) {
      setState(prevState => ({
        ...prevState,
        phase: 'SHOWS'
      }))
    }
  }, [session])


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userInfo = {
      email: data.get('email'),
      password: data.get('password'),
    }
  };


  const options = {
    isCaseSensitive: false,
    includeScore: true,
    includeMatches: true,
    threshold: 0.2,
    keys: ["title"],
  }

  const fuse = new Fuse(state.shows, options);

  const handleSearch = (event) => {
    event.preventDefault()
    const { value } = event.target;

    if (value.length === 0) {
      setState(prevState => ({
        ...prevState,
        shows: prevState.showBackup
      }));
      return;
    }

    const results = fuse.search(value);
    const items = results.map((result) => result.item);
    setState(prevState => ({
      ...prevState,
      shows: (items.length === 0) ? prevState.showBackup : items
    }));
  };

  /**
   * Function handles the favorites once clicked on each show
   */
  const handleFavorite = (id: string) => {
    setState(prevState => ({
      ...prevState,
      shows: prevState.shows.map((show) => {
        return show.id === id ? { ...show, favorite: !show.favorite, date: new Date().toLocaleString() } : show
      })
    }))
    setState(prevState => ({
      ...prevState,
      favoriteShows: [...prevState.shows].map((show) => {
        return show.favorite === true ? show : undefined
      }).filter(item => item !== undefined)
    }))

  }

  const handlePhase = () => {
    setState(prevState => ({
      ...prevState,
      phase: 'SHOWS',
      showDetails: {
        ...prevState.showDetails,
        showData: [],
        showImage: '',
        seasonPick: '',
        episodes: [],
        displayEpisodes: [],
        displayImage: '',
      }
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


  React.useEffect(() => {
    if (storedItems && state.reset === false) {
      return
    } else {
      fetch('https://podcast-api.netlify.app/shows')
        .then(res => res.json())
        .then(data => {

          const fetchGenre = (id: number) => {
            return fetch(`https://podcast-api.netlify.app/genre/${id}`)
              .then(res => res.json())
          }

          const fetchGenres = (idArr: []) => {
            let genrePromises = idArr.map(id => fetchGenre(id));
            return Promise.all(genrePromises)
          }
          let showPromises = data.map(show => {
            return fetchGenres(show.genres)
              .then(genres => {

                show.genres = genres
                return show
              })
          })

          return Promise.all(showPromises)
        })
        .then(showGenreData => {

          let showArray = showGenreData.map(item => ({
            ...item,
            favorite: false,
          }));
          return setState((prevState) => ({
            ...prevState,
            shows: showArray,
            loadCarousel: true,
            resetShows: false,
            showBackup: showArray,
            resetData: false,
          }))
        })
    }
  }, [state.resetData])




  /**
   * When show is selected / clicked on the fuction takes the ID from the show and 
   * uses the ID to fetch the single episode data from API
   * Once API has been fetched the phase changes 
   */
  const showDetailData = (id: string) => {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then(res => res.json())
      .then(data => setState((prevState) => ({
        ...prevState,
        showDetails: {
          ...prevState.showDetails,
          showData: data,
          showImage: data.image,
          showTitle: data.title,
          showDescription: data.description,
          showDate: data.updated
        },
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
      showBackup: prevState.shows.sort(titleUp),

    }))
  }

  const sortDecending = () => {
    setState(prevState => ({
      ...prevState,
      shows: prevState.shows.sort(titleDown),
      favoriteShows: prevState.favoriteShows.sort(titleDown),
      showBackup: prevState.shows.sort(titleDown),
    }))
  }

  const sortDecendingDate = () => {
    setState(prevState => ({
      ...prevState,
      shows: prevState.shows.sort(dateDown),
      favoriteShows: prevState.favoriteShows.sort(dateDown),
      showBackup: prevState.shows.sort(dateDown),
    }))
  }

  const sortAcendingDate = () => {
    setState(prevState => ({
      ...prevState,
      shows: prevState.shows.sort(dateUp),
      favoriteShows: prevState.favoriteShows.sort(dateUp),
      showBackup: prevState.shows.sort(dateUp),
    }))
  }

  const filterGenre = (title) => {
    const genreSort = filterByGenre(state.shows, title)

    setState(prevState => ({
      ...prevState,
      shows: genreSort
    }))
  }

  const resetShows = () => {
    setState(prevState => ({
      ...prevState,
      phase: 'RESET',
      isMediaPlaying: false,
    }))
    fetch('https://podcast-api.netlify.app/shows')
      .then(res => res.json())
      .then(data => {

        const fetchGenre = (id: number) => {
          return fetch(`https://podcast-api.netlify.app/genre/${id}`)
            .then(res => res.json())
        }

        const fetchGenres = (idArr: []) => {
          let genrePromises = idArr.map(id => fetchGenre(id));
          return Promise.all(genrePromises)
        }
        let showPromises = data.map(show => {
          return fetchGenres(show.genres)
            .then(genres => {

              show.genres = genres
              return show
            })
        })

        return Promise.all(showPromises)
      })
      .then(showGenreData => {

        let showArray = showGenreData.map(item => ({
          ...item,
          favorite: false,
        }));
        return setState((prevState) => ({
          ...prevState,
          shows: showArray,
          loadCarousel: true,
          resetShows: false,
          showBackup: showArray,
          resetData: false,
          phase: 'SHOWS'
        }))
      })
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
          genres={show.genres}
          updated={show.updated}
          seasons={show.seasons}
          episodeChange={showDetailData}
          toggleFav={handleFavorite}
          isFav={show.favorite}
          favUpdated={show.date}
          genreSort={filterGenre}
        />
      ))
    }
  }

  const handleSeasons = (event) => {
    setState(prevState => ({
      ...prevState,
      showDetails: {
        ...prevState.showDetails,
        seasonPick: event.target.value,
        displayEpisodes: prevState.showDetails.showData.seasons[event.target.value - 1].episodes,
        displayImage: prevState.showDetails.showData.seasons[event.target.value - 1].image
      }
    }));
  };
  const episodePreview = (props) => {
    if (props.showData.length === 0) {
      return <LoadingBar />
    } else {
      return (
        <Episode
          key={generateCode(16)}
          showData={props.showData}
          handleSeasons={handleSeasons}
          seasonPick={props.seasonPick}
          phase={handlePhase}
          image={props.displayImage}
          loadImage={props.showImage}
          episodes={props.displayEpisodes}
          description={props.showDescription}
          title={props.showTitle}
          updated={props.showDate}
          media={handleMedia}


        />
      )
    }
  }

  const handleMedia = (file, image, title) => {
    setState(prevState => ({
      ...prevState,
      mediaPlayer: {
        mediaTitle: title,
        mediaFile: file,
        mediaImage: image,
      },
      isMediaPlaying: true,
    }))
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

  const mediaPlayerPreview = (props) => {
    return (
      <MediaPlayer
        title={props.mediaTitle}
        file={props.mediaFile}
        image={props.mediaImage}
      />
    )
  }




  const showPreviewCards = showsPreview(state.phase === 'FAVORITES' ? state.favoriteShows : state.shows)
  const showDetails = episodePreview(state.showDetails)
  const showCarousel = carouselPreview(state.carousel)
  const showSortBar = showSortingBar(state.shows)
  const showMediaPlayer = mediaPlayerPreview(state.mediaPlayer)



  return (
    <>
      {state.phase === 'SIGNIN' ? <Auth /> : <div>
        <div className='nav-container'>
          <Navbar search={handleSearch} />
        </div>
        {state.isMediaPlaying ? showMediaPlayer : ''}
        {state.phase === 'RESET' ? <LoadingBar /> : <div>
          {state.phase === 'SHOWS' || 'FAVORITE' ? showCarousel : ''}
          {state.phase === 'SHOWS' || 'FAVORITE' ? showSortBar : ''}
        </div>}
        {state.phase === 'RESET' ? <LoadingBar /> : <div className='main-container'>
          {state.phase === 'EPISODE' ? showDetails : showPreviewCards}
        </div>}
      </div>}
    </>
  )
}