import { useState } from "react";

function Pagination({ page, totalPages, setPage }) {
  // funcionalidad para retrocedes la pagina
  function handlePrev() {
    if (page > 1) {
      setPage(page - 1);
    }
  }
  // funcionalidad para ir a la pagina siguiente
  function handleNext() {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  // se obtienen la cantidad de paginas para hacer la numeracion
  // de la paginacion
  function GetPages() {
    const pages = [];

    const start = Math.max(2, page - 4);
    const end = Math.min(totalPages - 1, page + 4);

    pages.push(1);

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  }

  const pages = GetPages();

  // estructura del componente
  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={page === 1}>
        Prev
      </button>

      {pages.map((p, index) =>
        p === "..." ? (
          <span key={index}>...</span>
        ) : (
          <button
            key={index}
            onClick={() => setPage(p)}
            className={p === page ? "active" : ""}
          >
            {p}
          </button>
        ),
      )}

      <button onClick={handleNext} disabled={page === totalPages}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
