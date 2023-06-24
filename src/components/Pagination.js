import React from 'react'
import { Pagination } from 'react-bootstrap'
import ReactPaginate from 'react-paginate';

const PaginationComponent = ({ getPage ,pageCount}) => {
    const handlePageClick = (data) => {
        console.log(data.selected + 1)
        getPage(data.selected + 1)
    }
    return (
        <ReactPaginate 
            breakLabel="..."
            nextLabel="NEXT"
            onPageChange={handlePageClick}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            pageCount={pageCount}
            previousLabel="PREV"
            containerClassName={"paginationItem pagination justify-content-center p-3"}
            pageClassName={"paginationItem m-1 text-muted page-item"}
            pageLinkClassName={"paginationItem text-muted  rounded-3 m-1 page-link"}
            previousClassName={"paginationItem text-muted m-1  rounded-3 page-item"}
            nextClassName={"paginationItem m-1 text-muted  rounded-3 page-item"}
            previousLinkClassName={"paginationItem text-muted  rounded-3 m-1 page-link"}
            nextLinkClassName={"paginationItem text-muted  rounded-3 m-1 page-link"}
            breakClassName={"paginationItem m-1 text-light  rounded-3 page-item"}
            breakLinkClassName={"paginationItem text-light  rounded-3 m-1  page-link"}
            activeClassName={"paginationItem m-1 text-light bg-black rounded-3 active"}
            
        />
    )
}

export default PaginationComponent
