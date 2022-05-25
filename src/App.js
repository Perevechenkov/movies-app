import { useState } from 'react';
import './App.scss';
import MoviesList from './components/MoviesList';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoviesHandler = async () => {
    setIsLoading(true);
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

      setIsLoading(false);
      setMovies(transformedMovies);
    }
  };

  return (
    <>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>No movies</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </>
  );
}

export default App;
