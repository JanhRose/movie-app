import { useState } from "react";

function Pagination({ page, totalPages, setPage }) {
  function handlePrev() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function handleNext() {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }
  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={page === 1}>
        Prev
      </button>
      <span>
        Page {page} of {totalPages}{" "}
      </span>
      <button onClick={handleNext} disabled={page === totalPages}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
