import { useState } from 'react';
import './App.scss';
import MoviesList from './components/MoviesList';

function App() {
  const [movies, setMovies] = useState([]);

  const fetchMoviesHandler = async () => {
    const responce = await fetch('https://swapi.dev/api/films/');

    if (responce.ok) {
      const movies = await responce.json();

      const transformedMovies = movies.results.map(movie => {
        return {
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date,
        };
      });

      setMovies(transformedMovies);
    }
  };

  return (
    <>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </>
  );
}

export default App;
