
import React from 'react'
import { supabase } from './supabaseClient'
import Auth from './components/Auth';
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
import { dateUp, dateDown, titleDown, titleUp, filterByGenre } from './utils/sorting'
import './App.css'
import { AppState, ShowData, showAPI } from './interfaces/type';

export default function App() {

  /*
  This code snippet involves working with the localStorage object,
  a web storage API for storing key-value pairs in a web browser.

  1. localStorage.getItem('localStorage'):
     - Retrieves the value associated with the key 'localStorage' from the browser's local storage.

  2. const storedItemsAsString = ...:
     - Stores the retrieved value from local storage in the variable 'storedItemsAsString'.
     - Values in localStorage are always in string format.

  3. const storedItems: AppState | null = ...:
     - Declares a variable 'storedItems' with a type annotation of 'AppState | null'.
     - 'AppState' presumably represents the structure of the data being stored.

  4. storedItemsAsString ? (JSON.parse(storedItemsAsString) as AppState) : null;:
     - Ternary operator checks if 'storedItemsAsString' is truthy (has a value).
     - If truthy, parses 'storedItemsAsString' as JSON into an object of type 'AppState'.
     - If falsy (null or undefined), assigns the value null to 'storedItems'.
*/
  const storedItemsAsString = localStorage.getItem('localStorage');
  const storedItems: AppState | null = storedItemsAsString
    ? (JSON.parse(storedItemsAsString) as AppState)
    : null;

  const [state, setState] = useState<AppState>((storedItems) ? storedItems : {
    phase: 'SHOWS',
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


  const [session, setSession] = useState(null)

  /**
   * The useEffect hook is managing user session state updates. The supabase.auth.getSession()
   * method fetches the current session, and supabase.auth.onAuthStateChange subscribes to changes in the
   * authentication state. Both asynchronous operations trigger updates to the session state using the setSession
   * function.
   */
  // @ts-ignore
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      // @ts-ignore
      setSession(session)

    })
    // @ts-ignore
    supabase.auth.onAuthStateChange((_event, session) => {
      // @ts-ignore
      setSession(session)
    })

  }, [])



  /**
   * this effect is responsible for updating the component's state based on changes in the user session,
   * Specifically setting the phase to 'SHOW' when a session is present.
   */
  React.useEffect(() => {
    if (session !== null) {
      setState(prevState => ({
        ...prevState,
        phase: 'SHOWS'
      }))
    }
  }, [session])


  /**
   * The provided code implements fuzzy searching using Fuse.js, a powerful library for searching
   * and matching data with flexible options.
   */

  /**
   * Configures the parameters for fuzzy search using Fuse.js. The updated options include
   * case-insensitive searching (isCaseSensitive: false), the inclusion of match details
   * (includeMatches: true), a matching threshold of 0.2, and specifies the "title" key
   * as the target for the search.
   * 
   */
  // @ts-ignore
  const options: Fuse.IFuseOptions<AppState> = {
    isCaseSensitive: false,
    includeMatches: true,
    threshold: 0.2,
    keys: ["title"],
  }

  /**
   *  Initializes a new instance of Fuse with the specified search options and
   *  the current state's list of shows.
   */
  const fuse = new Fuse(state.shows, options);

  /**
   * This function is triggered when a user performs a search. It prevents the 
   * default form submission behavior, retrieves the search query from the input field,
   * and initiates the fuzzy search using Fuse.js. If the search query is empty
   * (value.length === 0), it restores the original list of shows from the backup
   * stored in the component's state (showBackup). This ensures that the complete 
   * list is displayed when the search input is cleared.
   */
  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    const { value } = event.target as HTMLInputElement;

    if (value.length === 0) {
      setState(prevState => ({
        ...prevState,
        shows: prevState.showBackup
      }));
      return;
    }

    /**
     * If there is a non-empty search query, it performs the fuzzy search using Fuse.js
     * and updates the component's state with the search results. If no matches are found,
     * it restores the original list from the backup to maintain a meaningful display.
     */
    const results = fuse.search(value);
    const items = results.map((result) => result.item);
    setState(prevState => ({
      ...prevState,
      shows: (items.length === 0) ? prevState.showBackup : items
    }));
  };



  /**
   * The first part of the function, within the initial setState call, iterates over
   * the existing shows, toggling the favorite property of the show with the matching id.
   * It also updates the date property to reflect the current timestamp. The second part
   * of the function, in a separate setState call, extracts all shows with favorite set
   * to true into a new array (favoriteShows). This step ensures an up-to-date list of
   * favorited shows for any subsequent display.
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




  /**
   * This useEffect is designed to generate a dynamic array of show data for a carousel component.
   * When triggered by changes in the loadCarousel state, it clones the existing shows array, shuffles
   * it randomly, and then extracts the first 11 items to form a curated set for the carousel.
   * This effect ensures that the carousel is populated with a diverse and shuffled collection of shows,
   * enhancing the visual appeal and engagement of the user interface.
   */
  React.useEffect(() => {
    const shuffled = [...state.shows].sort(() => 0.5 - Math.random());
    setState((prevState) => ({
      ...prevState,
      carousel: shuffled.slice(0, 11),
    }))
  }, [state.loadCarousel])



  /**
   * This useEffect functions with the fetching and processing of podcast show data from an external API,
   * ensuring data integrity and preparing the state for the component. When triggered by changes in the
   * resetData state, it checks if there are stored items and if resetData is not set to false. If these
   * conditions are met, the effect returns early to maintain existing data. Otherwise, it fetches the
   * latest show data from the API (https://podcast-api.netlify.app/shows) and concurrently fetches
   * genre information for each show.
   * 
   * The fetching process employs promises and asynchronous operations to handle genre data retrieval
   * efficiently. Once all promises are resolved, the show data is processed to include genre information
   * and is formatted to include a default favorite property set to false. The component's state is then
   * updated with the new show array, marking the completion of the data loading process. This effect contributes
   * to the initial setup of the component, ensuring a diverse and enriched dataset for subsequent rendering and interactions.
   */
  React.useEffect(() => {
    if (storedItems && state.resetData === false) {
      return
    } else {
      fetch('https://podcast-api.netlify.app/shows')
        .then(res => res.json())
        .then((data: ShowData) => {

          const fetchGenre = (id: number) => {
            return fetch(`https://podcast-api.netlify.app/genre/${id}`)
              .then(res => res.json())
          }

          const fetchGenres = (idArr: any[]) => {
            let genrePromises = idArr.map(id => fetchGenre(id));
            return Promise.all(genrePromises)
          }
          let showPromises = data.map((show: showAPI) => {
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
   * This function is responsible for handling the click event on a specific show. When invoked 
   * with a show ID, it initiates a request to an external API (https://podcast-api.netlify.app/id/${id})
   * to fetch detailed data about the selected show. Upon receiving the API response, the component's state
   * is updated to include the specific details of the selected show, such as its image, title, description,
   * and last updated date.
   * The state update also triggers a change in the component's phase property, transitioning it to the 'EPISODE'
   * phase. This change in phase signifies a shift in the user interface to display detailed information about
   * the selected show.
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

  /**
   * This function, sortAscending, facilitates the ascending sorting of podcast shows based on their titles.
   * Upon invocation, it updates the component's state by sorting the primary show list (shows), the list of
   * favorite shows (favoriteShows), and the backup show list (showBackup) in ascending order. The sorting is
   * accomplished using the titleUp comparator function, resulting in an organized display of shows
   * alphabetically by title. This function enhances the user experience by providing an ordered
   * presentation of podcast content.
   */
  const sortAcending = () => {
    setState((prevState) => ({
      ...prevState,
      shows: prevState.shows.sort(titleUp),
      favoriteShows: prevState.favoriteShows.sort(titleUp),
      showBackup: prevState.shows.sort(titleUp),

    }))
  }

  /**
   * Function to sort podcast shows in descending order based on their titles.
   * It updates the component's state by sorting the primary show list, the list
   * of favorite shows, and the backup show list in descending alphabetical order.
   * The sorting is accomplished using the titleDown comparator function.
   * This function enhances the user experience by providing an organized display
   * of podcast content in reverse alphabetical order.
   */
  const sortDecending = () => {
    setState(prevState => ({
      ...prevState,
      shows: prevState.shows.sort(titleDown),
      favoriteShows: prevState.favoriteShows.sort(titleDown),
      showBackup: prevState.shows.sort(titleDown),
    }))
  }

  /**
 * Function to sort podcast shows in descending order based on their last updated dates.
 * It updates the component's state by sorting the primary show list, the list
 * of favorite shows, and the backup show list in descending order of the last updated dates.
 * The sorting is accomplished using the dateDown comparator function.
 * This function enhances the user experience by providing an organized display
 * of podcast content with the latest updates appearing first.
 */
  const sortDecendingDate = () => {
    setState(prevState => ({
      ...prevState,
      shows: prevState.shows.sort(dateDown),
      favoriteShows: prevState.favoriteShows.sort(dateDown),
      showBackup: prevState.shows.sort(dateDown),
    }))
  }

  /**
 * Function to sort podcast shows in ascending order based on their last updated dates.
 * It updates the component's state by sorting the primary show list, the list
 * of favorite shows, and the backup show list in ascending order of the last updated dates.
 * The sorting is accomplished using the dateUp comparator function.
 * This function enhances the user experience by providing an organized display
 * of podcast content with the earliest updates appearing first.
 */
  const sortAcendingDate = () => {
    setState(prevState => ({
      ...prevState,
      shows: prevState.shows.sort(dateUp),
      favoriteShows: prevState.favoriteShows.sort(dateUp),
      showBackup: prevState.shows.sort(dateUp),
    }))
  }

  /**
 * Function to filter podcast shows by a specific genre title.
 * It retrieves a filtered list of shows from the component's state based on the given genre title
 * using the filterByGenre utility function. The component's state is then updated to display
 * only the shows that belong to the specified genre.
 * This function enhances the user experience by allowing focused exploration of shows within a specific genre.
 * 
 * @param {string} title - The title of the genre to filter shows by.
 */
  const filterGenre = (title: string) => {
    const genreSort = filterByGenre(state.shows, title)

    setState(prevState => ({
      ...prevState,
      shows: genreSort
    }))
  }

  /**
 * Function to reset the component's state and fetch fresh podcast show data from an external API.
 * It transitions the component's phase to 'RESET', indicating a reset operation, and sets the media
 * playing state to false. The function then fetches updated show data from the API
 * ('https://podcast-api.netlify.app/shows') along with associated genre information.
 * Upon successfully fetching and processing the data, it updates the component's state with the new show array,
 * resets relevant flags, and transitions the phase back to 'SHOWS'. This function ensures the component is
 * refreshed with the latest podcast content, providing an updated and seamless user experience.
 */
  const resetShows = () => {
    setState(prevState => ({
      ...prevState,
      phase: 'RESET',
      isMediaPlaying: false,
    }))
    fetch('https://podcast-api.netlify.app/shows')
      .then(res => res.json())
      .then((data: ShowData) => {

        const fetchGenre = (id: number) => {
          return fetch(`https://podcast-api.netlify.app/genre/${id}`)
            .then(res => res.json())
        }

        const fetchGenres = (idArr: any[]) => {
          let genrePromises = idArr.map(id => fetchGenre(id));
          return Promise.all(genrePromises)
        }
        let showPromises = data.map((show: showAPI) => {
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


  /**
 * Function to render a preview of podcast shows based on the provided props.
 * If the props array is empty, it returns a loading bar component to indicate ongoing data loading.
 * Otherwise, it maps over the array of show props and generates a 'Shows' component for each show,
 * incorporating essential details such as title, description, image, genres, updated date, seasons, etc.
 * The generated components include functionality for handling show details, toggling favorites,
 * and filtering shows by genre. Each 'Shows' component is uniquely identified by a generated key.
 * This function contributes to the user interface by presenting a dynamic preview of podcast shows
 * with interactive features for exploration and engagement.
 */
  // @ts-ignore
  const showsPreview = (props) => {
    if (props.length === 0) {
      return <LoadingBar />
    } else {
      // @ts-ignore
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



  /**
   * Function to render a preview of podcast episodes based on the provided props.
   * If the showData array within the props is empty, it returns a loading bar component
   * to indicate ongoing data loading. Otherwise, it generates an 'Episode' component using
   * the provided props, including show data, handling functions for seasons, phases, media,
   * and other essential details. Each 'Episode' component is uniquely identified by a generated key.
   * This function enhances the user experience by presenting a dynamic preview of podcast episodes
   * with interactive features for exploration and playback.
   */
  // @ts-ignore
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
  /**
 * Function to handle the transition of the component's phase back to 'SHOWS'
 * and reset relevant details within the 'showDetails' state.
 * This function is typically invoked when transitioning from episode details back to show previews.
 */
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


  /**
   * Function to render a preview of podcast shows within a carousel based on the provided props.
   * If the props array is empty, it returns a loading bar component to indicate ongoing data loading.
   * Otherwise, it generates a 'LandingCarousel' component using the provided props, including
   * carousel data for rendering. This function enhances the user experience by presenting an engaging
   * and visually appealing carousel of podcast shows, providing an interactive element for users to explore.
   */
  // @ts-ignore
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


  /**
   * Function to render a sorting bar component based on the provided props.
   * If the props array is empty, it returns a loading bar component to indicate ongoing data loading.
   * Otherwise, it generates a 'SortingButtons' component using the provided props, including
   * functions for sorting shows in ascending and descending order, resetting shows, and sorting by date.
   * This function enhances the user experience by providing interactive sorting options for podcast shows.
   */
  // @ts-ignore
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


  /**
   * Function to render a preview of a media player component based on the provided media props.
   * It takes in the media title, file, and image, and generates a 'MediaPlayer' component with
   * the corresponding properties. This function enhances the user experience by presenting a
   * preview of a media player for a specific piece of content, such as a podcast episode or show.
   */
  const mediaPlayerPreview = (props: { mediaTitle: string, mediaFile: string, mediaImage: string }) => {
    return (
      <MediaPlayer
        title={props.mediaTitle}
        file={props.mediaFile}
        image={props.mediaImage}
      />
    )
  }


  /**
 * Function to handle media playback by updating the component's state with media details.
 * It takes in the file, image, and title of the media to be played and updates the state
 * with these details. Additionally, it sets the 'isMediaPlaying' flag to true, indicating
 * that media playback is active. This function enhances the user experience by seamlessly
 * transitioning to media playback with the specified content details.
 */
  const handleMedia = (file: string, image: string, title: string) => {
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


  /**
 * Function to handle the selection of a specific season for a podcast show.
 * It takes in the event triggered by the selection and updates the component's state
 * with the chosen season details. The function modifies the 'showDetails' state, setting
 * the 'seasonPick' to the selected season value and updating the displayed episodes and image
 * based on the chosen season. This function enhances the user experience by allowing the user
 * to explore episodes specific to a chosen season within a podcast show.
 */
  // @ts-ignore
  const handleSeasons = (event) => {
    setState(prevState => ({
      ...prevState,
      showDetails: {
        ...prevState.showDetails,
        seasonPick: event.target.value,
        // @ts-ignore
        displayEpisodes: prevState.showDetails.showData.seasons[event.target.value - 1].episodes,
        // @ts-ignore
        displayImage: prevState.showDetails.showData.seasons[event.target.value - 1].image
      }
    }));
  };

  /**
 * Function to handle a phase change within the component.
 * If the list of favorite shows is empty, the function returns early without changing the phase.
 * Otherwise, it updates the component's state to set the phase to 'FAVORITES', indicating a transition
 * to the favorites view. This function enhances the user experience by allowing seamless navigation
 * between different phases or views within the component, with a specific focus on favorites if available.
 */
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
   * Renders preview cards for podcast shows, either from the favorites or all shows based on the current phase.
   * Utilizes the 'showsPreview' function with the appropriate show data based on the phase.
   */
  const showPreviewCards = showsPreview(state.phase === 'FAVORITES' ? state.favoriteShows : state.shows)

  /**
   * Renders the preview of podcast episodes with details based on the 'showDetails' state.
   * Utilizes the 'episodePreview' function with the current show details.
   */
  const showDetails = episodePreview(state.showDetails)

  /**
   * Renders a preview of podcast shows within a carousel based on the 'carousel' state.
   * Utilizes the 'carouselPreview' function with the current carousel data.
   */
  const showCarousel = carouselPreview(state.carousel)

  /**
   * Renders a sorting bar component for podcast shows based on the 'shows' state.
   * Utilizes the 'showSortingBar' function with the current show data.
   */
  const showSortBar = showSortingBar(state.shows)

  /**
   * Renders a preview of the media player component based on the 'mediaPlayer' state.
   * Utilizes the 'mediaPlayerPreview' function with the current media player details.
   */
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