import { useState, useEffect } from 'react';

import FullFeatureList from '../../components/shared/FullFeatureList';
import Modal from '../../components/shared/Modal';

const BASE_URL = 'https://www.omdbapi.com'
const API_KEY = '5cf96ac5'
const MOVIE_LIST = 'movie-list'

function App() {
  const [searchText, setSearchText] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [fetchError, setFetchError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [confirmationStep, setConfirmationStep] = useState(1);
  const [movieListIsOpen, setMovieListIsOpen] = useState(false);

  const updateSearchField = (event) => {
    // TODO: debounce search, or search on button click
    setSearchText(event.target.value)
  }
  const handleAddMovieClick = (event) => {
    setSelectedMovie(movieList[event.target.value])
  }
  const addMovieToList = () => {
    // TODO: handle previously added movies better
    // TODO: create local storage utils or even a class to handle
    const currentListString = localStorage.getItem(MOVIE_LIST) || "[]" // empty array is set on first load
    const currentList = JSON.parse(currentListString)
    const matchedMovie = currentList.find(movie => movie.imdbID === selectedMovie.imdbID)
    if (matchedMovie) {
      alert('You already have this movie in your list!')
      return handleModalClose()
    }
    localStorage.setItem(MOVIE_LIST, JSON.stringify([...currentList, selectedMovie]))
    setConfirmationStep(2)
  }
  const handleModalClose = () => {
    setMovieListIsOpen(false)
    setSelectedMovie(null)
    setConfirmationStep(1)
  }
  const handleReviewListRequest = () => {
    setMovieListIsOpen(true)
    setSelectedMovie(null)
  }

  useEffect(() => {
    setIsLoading(true);

    fetch(`${BASE_URL}/?s=${ searchText }&page=${ page }&apiKey=${ API_KEY }`)
      .then(async response => {
        const searchResult = await response.json()
        if (searchResult.Response === 'True') {
          setMovieList(searchResult.Search)
        } else {
          setMovieList([])
          setFetchError(searchResult.Error)
        }

        setIsLoading(false);
      })
      .catch(({message}) => {
        setFetchError(message);
        setIsLoading(false);
      })

  }, [searchText, page]);

  if (selectedMovie) {
    return (
      <Modal handleClose={handleModalClose}>
        {
          confirmationStep === 1 ? (
            <>
              <p>
                Are you sure you want to add <b>{selectedMovie.Title}</b> to your movie list?
              </p>
              <button onClick={addMovieToList} className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                YES!
              </button>
            </>
          ) : (
            <>
              <p>
                Would you like to review your list?
              </p>
              <button onClick={handleReviewListRequest} className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                YES!
              </button>
            </>
          )
        }
      </Modal>
    )
  } else if (movieListIsOpen) {
    return (
      <Modal handleClose={handleModalClose}>
        <ul>
          {JSON.parse(localStorage.getItem(MOVIE_LIST)).map(movie => {
            return (
              <li key={movie.imdbID} className="mt-2">
                {movie.Title}
              </li>
            )
          })}
        </ul>
      </Modal>
    )
  }

  return (
    <FullFeatureList searchFieldLabel="Movie Search" searchText={ searchText } updateSearchField={ updateSearchField }>
      {
        movieList.length ? (
          <ul className="flex flex-wrap justify-center items-center mt-5">
            {
              movieList.map((movie, movieIndex) =>
                // TODO: Create movie card component
                <li key={movie.imdbID} className="shadow-lg border mb-4 mx-2 relative">
                  <img src={movie.Poster} alt="movie-poster" />
                  {/* TODO: Make button component */}
                  <button value={movieIndex} onClick={handleAddMovieClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute top-2 right-2 opacity-80">
                    + Save
                  </button>
                </li>
              )
            }
          </ul>
        ) : (
          <h1 className="text-center mt-12">
            {/* TODO: create standard HTTP request error handling */}
            {/* TODO: Create loader component */}
            { isLoading ? 'LOADER' : fetchError}
          </h1>
        )
      }
    </FullFeatureList>
  );
}

export default App;
