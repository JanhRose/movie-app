import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loader from "../components/Loader";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const Api_Key = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${Api_Key}`,
        );

        if (!response.ok) {
          throw new error("Api error");
        }

        const data = await response.json();
        console.log(data);
        setMovie(data);
      } catch (error) {
        console.error(Error);
        setError("failed to loading movies");
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="error"> {error} </p>;
  }

  if (!movie) {
    return <p>No movie found</p>;
  }

  return (
    <>
      <Link to="/" className="back-link">
        back
      </Link>

      <div className="movie-details">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
        <div className="movie-info">
          <h1>{movie.title} </h1>
          <p className="movie-rating">rating: {movie.vote_average} </p>
          <p className="movie-overview">{movie.overview} </p>
          <p className="movie-date">release: {movie.release_date} </p>
        </div>
      </div>
    </>
  );
}

export default MovieDetails;
