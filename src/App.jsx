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
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);

        let url;

        if (query) {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${Api_Key}&query=${query}&page=${page}`;
        } else {
          url = `https://api.themoviedb.org/3/movie/popular?api_key=${Api_Key}&page=${page}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        setMovies(data.results);
        setTotalPage(Math.min(data.total_pages, 500));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [query, page]);

  return (
    <>
      <main className="main">
        <SearchBar setQuery={setQuery} setPage={setPage} />
        {Loading ? <Loader /> : <MovieList movies={movies} />}
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </main>
    </>
  );
}

export default App;
