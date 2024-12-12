import React from "react";
import LeftIcon from "./icons/LeftIcon";
import RightIcon from "./icons/RightIcon";
import ReactPaginate from "react-paginate";
import "./style.css";

function Pagination({
  totalPage,
  page,
  pageSize,
  total,
  flag = true,
  onChange = (e) => {},
}) {
  return (
    <div className="pagination-container">
      {flag ? (
        <div className="pagination-info">
          <span>
            {(page - 1) * pageSize + 1}-
            {page * pageSize > total ? total : page * pageSize}{" "}
            <span
              style={{
                color: "#72777A",
              }}
            >
              trong tổng
            </span>{" "}
            {total}
          </span>
        </div>
      ) : (
        ""
      )}
      <div className="pagination-page">
        <ReactPaginate
          breakLabel="..."
          previousLabel={
            <div
              className={`icon ${
                page === 1 ? "icon-left" : "pagination-one-page-unactive"
              }`}
            >
              <LeftIcon />
            </div>
          }
          nextLabel={
            <div
              className={`icon ${
                page === totalPage
                  ? "icon-right"
                  : "pagination-one-page-unactive"
              }`}
            >
              <RightIcon />
            </div>
          }
          onPageChange={({ selected }) => onChange(selected + 1)}
          pageRangeDisplayed={4}
          pageCount={totalPage}
          renderOnZeroPageCount={null}
          containerClassName="ReactPaginate-container"
          pageLinkClassName="pagination-one-page-unactive"
          activeLinkClassName="pagination-one-page-active"
          forcePage={page - 1}
        />
      </div>
    </div>
  );
}

export default Pagination;
