import './App.css';
import {getMovielist, searchMovie} from "./api" //ini ambil dari api
import { useEffect, useState } from 'react';

const App = () => {
const [popularMovies, setPopularMovies] = useState([]) //ini untuk menampung listmovie

    useEffect(() =>{
      getMovielist().then((result) => {
        setPopularMovies(result)
      })
      
    }, [])

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-title">{movie.title}</div>
          <img className="Movie-img"
          src= {`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}/> 
          <div className="Movie-date">Release : {movie.release_date}</div>
          <div className="Movie-rate">{movie.vote_average}</div>
        </div>
      )
    })
  }

    const search = async(q) => {
     if (q.length > 3) {
      const query = await searchMovie(q)
      setPopularMovies(query.results)
      // console.log({query: query})
     }
    }

  return (
    <div className="App">
      <header className="App-header">
        <h1>ALWI MOVIE</h1>
          <input placeholder='Search Movie ...' 
          className='movie-search'
          onChange={({target}) => search(target.value)}
          />

        <div className="Movie-Container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
}

export default App;
