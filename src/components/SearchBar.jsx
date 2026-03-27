import { useState } from "react";

function SearchBar({ setQuery, setPage }) {
  const [search, setSearch] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setQuery(search);
    setPage(1);
  }

  return (
    <header className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="search movie"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>
    </header>
  );
}

export default SearchBar;
