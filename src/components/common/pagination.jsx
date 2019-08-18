import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize); // to return the nearest whole number
  if (pagesCount === 1) return null;
  // using lodash range function to generate array from the range given as a parameter
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination pagination-sm">
        <li className="page-item">
          <a className="page-link">&laquo;</a>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a
              className="page-link"
              href="javascript:void(0);"
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link">&raquo;</a>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
}

export default Pagination;
