import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id} `} className="movie-links">
      <article className="movie-card">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
        <h3>{movie.title}</h3>
        <p>rating: {movie.vote_average} </p>
      </article>
    </Link>
  );
}

export default MovieCard;
