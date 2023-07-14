import React, { Fragment } from "react";
import "./pagination.css";
import { ReactComponent as PrevArrow } from "../../Icons/Arrow.svg";
import { ReactComponent as NextArrow } from "../../Icons/Arrow.svg";

const Pagination = ({ totalPages, page, handlePageChange }) => {
  return (
    <Fragment>
      {totalPages > 1 && (
        <div className="pagination">
          {page > 1 && (
            <button className="pageButton" onClick={() => handlePageChange(page - 1)}>
              <PrevArrow className="prevArrow" />
              Previous
            </button>
          )}
          {[...Array(totalPages)].map((_, i) => {
            if (
              i === 0 ||
              i === totalPages - 1 ||
              (i >= page - 2 && i <= page + 1) ||
              (i >= totalPages - 4 && i <= page + 2)
            ) {
              return (
                <button
                  key={i}
                  className={`pageButton ${page === i + 1 ? "active" : ""}`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              );
            } else if (i === 1 || i === totalPages - 2) {
              return <span key={i}>. . .</span>;
            } else {
              return null;
            }
          })}
          {page < totalPages && (
            <button className="pageButton" onClick={() => handlePageChange(page + 1)}>
              Next
              <NextArrow className="nextArrow" />
            </button>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Pagination;
