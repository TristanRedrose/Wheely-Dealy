import React from "react";
import { useListingsStore } from "../../../Context/ListingsContext";
import "./Pagination.css"

const Pagination: React.FC = () => {

    const {page, maxPages, setPage, incrementPage, decrementPage} = useListingsStore();

    return (
        <div className="pagination">
            {page > 1 && <div className="page-button" onClick={() => {
                setPage(1)}}>
                <h5>1</h5>
            </div>}
            {page > 1 && <div className="page-button" onClick={() => decrementPage()}>
                <h5>Prev...</h5>
            </div>}
            {page < maxPages && <div className="page-button" onClick={() => incrementPage()}>
                <h5>Next...</h5>
            </div>}
            {page < maxPages && <div className="page-button" onClick={() => setPage(maxPages)}>
                <h5>{maxPages}</h5>
            </div>}
        </div>
    )
}

export default Pagination