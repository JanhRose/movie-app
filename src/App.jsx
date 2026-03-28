import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import Loader from "./components/Loader";
import Pagination from "./components/pagination";
import "./index.css";
function App() {
  const Api_Key = import.meta.env.VITE_TMDB_API_KEY;

  //  el page va a ser para la paginacion. todavia no esta hecha
  const [page, setPage] = useState(1);
  //  cuantas paginas tiene al final
  const [totalPages, setTotalPage] = useState(3);
  //  barra de busqueda
  const [query, setQuery] = useState("");
  //  aca se guardaran las peliculas
  const [movies, setMovies] = useState([]);
  //  lo que se mostrara mientras se cargan las peliculas
  const [loading, setLoading] = useState(false);
  // manejo de errores
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError(null);

        let url;

        if (query) {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${Api_Key}&query=${query}&page=${page}`;
        } else {
          url = `https://api.themoviedb.org/3/movie/popular?api_key=${Api_Key}&page=${page}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new error("Api error");
        }

        const data = await response.json();

        setMovies(data.results);
        setTotalPage(Math.min(data.total_pages, 500));
      } catch (error) {
        console.error(Error);
        setError("failed to loading movies");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [query, page]);

  // si se encuentra cargando. muestra
  if (loading) {
    return <Loader />;
  }

  // evalua si tiene un error
  if (error) {
    return <p className="error"> {error} </p>;
  }

  // si no encuentra nada explica el porque
  if (movies.length === 0) {
    return (
      <>
        <SearchBar setQuery={setQuery} setPage={setPage} />
        <p className="no-results">No movies found for: {query} </p>
      </>
    );
  }

  // si todo esta bien deberia devolver
  return (
    <>
      <main className="main">
        <SearchBar setQuery={setQuery} setPage={setPage} />
        <MovieList movies={movies} />
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </main>
    </>
  );
}

export default App;
