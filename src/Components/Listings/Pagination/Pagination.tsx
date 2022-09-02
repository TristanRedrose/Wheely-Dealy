import React, { Dispatch, SetStateAction } from "react";
import "./Pagination.css"

interface PaginationProps {
    maxPages: number,
    page: number,
    setPage: Dispatch<SetStateAction<number>>
}

const Pagination: React.FC<PaginationProps> = ({maxPages,page,setPage}) => {
    return (
        <div className="pagination">
            {page > 1 && <div className="page-button" onClick={() => {
                setPage(page = 1)}}>
                <h5>1</h5>
            </div>}
            {page > 1 && <div className="page-button" onClick={() => {if (page !== 1) setPage(--page)}}>
                <h5>Prev...</h5>
            </div>}
            {page < maxPages && <div className="page-button" onClick={() => {if (page !== maxPages) setPage(++page)}}>
                <h5>Next...</h5>
            </div>}
            {page < maxPages && <div className="page-button" onClick={() => {setPage(page = maxPages)}}>
                <h5>{maxPages}</h5>
            </div>}
        </div>
    )
}

export default Pagination