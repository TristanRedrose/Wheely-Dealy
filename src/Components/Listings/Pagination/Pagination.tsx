import React from "react";
import { useListingsStore } from "../../../Context/ListingsContext";
import "./Pagination.css"

const Pagination: React.FC = () => {

    const listingsStore = useListingsStore();

    return (
        <div className="pagination">
            {listingsStore.page > 1 && <div className="page-button" onClick={() => {
                listingsStore.setPage(1)}}>
                <h5>1</h5>
            </div>}
            {listingsStore.page > 1 && <div className="page-button" onClick={() => listingsStore.decrementPage()}>
                <h5>Prev...</h5>
            </div>}
            {listingsStore.page < listingsStore.maxPages && <div className="page-button" onClick={() => listingsStore.incrementPage()}>
                <h5>Next...</h5>
            </div>}
            {listingsStore.page < listingsStore.maxPages && <div className="page-button" onClick={() => listingsStore.setPage(listingsStore.maxPages)}>
                <h5>{listingsStore.maxPages}</h5>
            </div>}
        </div>
    )
}

export default Pagination