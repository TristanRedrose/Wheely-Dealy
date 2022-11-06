import React from "react";
import { useRootStore } from "../../../Context/StoresContext";
import "./Pagination.css"

const Pagination: React.FC = () => {

    const {listingsPageStore} = useRootStore();
    const {page, maxPages, setPage, incrementPage, decrementPage} = listingsPageStore;

    return (
        <div className="pagination">
            <div className="pagi-buttons-container">
                {page > 1 && <div className="page-button" onClick={() => {
                    setPage(1)}}>
                    <h5>1</h5>
                </div>}
                {(page - 4) > 1 && <div className="page-button" onClick={() => setPage(page - 4)}>
                    <h5>{page - 4}</h5>
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
                {(page + 4) < maxPages && <div className="page-button" onClick={() => setPage(page + 4)}>
                    <h5>{page + 4}</h5>
                </div>}
                {page < maxPages && <div className="page-button" onClick={() => setPage(maxPages)}>
                    <h5>{maxPages}</h5>
                </div>}
            </div>
        </div>
    )
}

export default Pagination