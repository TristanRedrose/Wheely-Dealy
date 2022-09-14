import React from "react";
import { useListingsStore } from "../../../Context/ListingsContext";
import "./Pagination.css"

const Pagination: React.FC = () => {

    const {page, maxPages, setPage, incrementPage, decrementPage} = useListingsStore();

    return (
        <div className="pagination">
            <div className="pagi-buttons-container">
                {page > 1 && <div className="page-button" onClick={() => {
                    setPage(1)}}>
                    <h5>1</h5>
                </div>}
                {(page - 10) > 1 && <div className="page-button" onClick={() => setPage(page-10)}>
                    <h5>{'<<'}</h5>
                </div>}
                {page > 1 && <div className="page-button" onClick={() => decrementPage()}>
                    <h5>{'<'}</h5>
                </div>}
            </div>
            <div className="current-page-div">
                <div>
                    <h5>{page} of {maxPages}</h5>
                </div>
            </div>
            <div className="pagi-buttons-container">
                {page < maxPages && <div className="page-button" onClick={() => incrementPage()}>
                    <h5>{'>'}</h5>
                </div>}
                {(page + 10) < maxPages && <div className="page-button" onClick={() => setPage(page+10)}>
                    <h5>{'>>'}</h5>
                </div>}
                {page < maxPages && <div className="page-button" onClick={() => setPage(maxPages)}>
                    <h5>{maxPages}</h5>
                </div>}
            </div>
        </div>
    )
}

export default Pagination