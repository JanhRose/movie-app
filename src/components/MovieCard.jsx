function MovieCard({ movie }) {
  return (
    <article className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
      <h3>{movie.title}</h3>
      <p>rating: {movie.vote_average} </p>
    </article>
  );
}

export default MovieCard;
