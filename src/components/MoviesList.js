import Movie from './Movie';
import classes from './MoviesList.module.scss';

export default function MoviesList(props) {
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map(movie => {
        return (
          <Movie
            key={movie.id}
            title={movie.title}
            openingText={movie.openingText}
            releaseDate={movie.releaseDate}
          />
        );
      })}
    </ul>
  );
}
