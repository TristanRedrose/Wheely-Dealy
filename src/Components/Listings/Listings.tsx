import React, { useEffect} from "react";
import Listing from "./Listing";
import "./Listings.css";
import { observer } from "mobx-react-lite"

import Pagination from "./Pagination/Pagination";
import { useListingsStore } from "../../Context/ListingsContext";

const Listings: React.FC = observer(() => {

    const listingStore = useListingsStore()

    useEffect(() => {
        listingStore.paginate()
    }, [listingStore.page, listingStore.filteredList])

    return (
        <div className="listings">
            <div className="listing-title">
                <h2 className="lobster-text">All Listings</h2>
                <h5 className="page-info">Page {listingStore.page} of {listingStore.maxPages}</h5>
                <select className="filter" defaultValue={"All"} onChange={(e) => listingStore.filterList(e)}>
                    <option value={"All"}>All</option>
                    {listingStore.companyList.map(item => {
                        return <option key={item.id} value={item.company}>{item.company}</option>
                    })}
                </select>
                <div className="sorting-container">
                <h5>Horsepower:</h5>
                <select className="filter" defaultValue={"none"} onChange={(e) => listingStore.sortByHorsepower(e)}>
                    <option value={"none"}>All</option>
                    <option value={"highest"}>Highest first</option>
                    <option value={"lowest"}>Lowest first</option>
                </select>
                </div>
            </div>
            <div className="listings-container">
                {listingStore.currentList.map(listing => {
                    return <Listing key={listing.id} listing={listing} />
                })}
            </div>
            <div className="pagination-box">
                <h5 className="page-info">Page {listingStore.page} of {listingStore.maxPages}</h5>
                <Pagination />
            </div>
        </div>
    )
})

export default Listings;