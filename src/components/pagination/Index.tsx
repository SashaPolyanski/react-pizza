import React from 'react';
import ReactPaginate from "react-paginate";
import s from './Pagintion.module.scss'

type PaginationType = {
  setCurrentPageHandler: (value: number)=>void
}

export const Pagination = ({setCurrentPageHandler}: PaginationType) => {
  return (
    <ReactPaginate
      className={s.pagination}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event)=>{setCurrentPageHandler(event.selected + 1)}}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
    />
  );
};