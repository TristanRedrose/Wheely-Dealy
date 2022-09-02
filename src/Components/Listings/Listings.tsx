import React, { useEffect, useState, useMemo } from "react";
import Listing from "./Listing";
import "./Listings.css";
import { ListingStoreImpl } from "../../Stores/ListingStore";
import { CarListing } from "../../Types/listing.type";
import Pagination from "./Pagination/Pagination";

interface ListingStoreProps {
    listingStore: ListingStoreImpl
}

const Listings: React.FC<ListingStoreProps> = ({listingStore}) => {

    let [filteredList, setFilteredList] = useState<CarListing[]>(listingStore.listings)
    let [currentList, setCurrentList] = useState<CarListing[]>([])

    let [page, setPage] = useState<number>(1)
    let listingsPerPage: number = 8
    let maxPages: number = Math.ceil(filteredList.length / listingsPerPage)

    function filterList(event: React.FormEvent<HTMLSelectElement>): void  {
        if (event.currentTarget.value === "All") {
            setFilteredList(filteredList = listingStore.listings);
            return;
        }

        setFilteredList(filteredList = listingStore.listings.filter(item => item.make === event.currentTarget.value));
    }

    useEffect(() => {
        setCurrentList(currentList = filteredList.slice((page - 1) * 8, page* 8))
    }, [page, filteredList])

    return (
        <div className="listings">
            <div className="listing-title">
                <h2 className="lobster-text">All Listings</h2>
                <h5 className="page-info">Page {page} of {maxPages}</h5>
                <select className="filter" defaultValue={"All"} onChange={useMemo(() => filterList, [])}>
                    <option value={"All"}>All</option>
                    {listingStore.companyList.map(item => {
                        return <option key={item.id} value={item.company}>{item.company}</option>
                    })}
                </select>
            </div>
            <div className="listings-container">
                {currentList.map(listing => {
                    return <Listing key={listing.id} listing={listing} />
                })}
            </div>
            <div className="pagination-box">
                <h5 className="page-info">Page {page} of {maxPages}</h5>
                <Pagination setPage={setPage} page={page} maxPages={maxPages} />
            </div>
        </div>
    )
}

export default Listings;