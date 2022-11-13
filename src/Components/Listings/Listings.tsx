import React, { useEffect} from "react";
import { observer } from "mobx-react-lite"
import { useRootStore } from "../../Context/StoresContext";
import "./Listings.css";
import Listing from "./Listing";
import ListingsFilterSort from "./FilterSort/FilterSort";
import Pagination from "./Pagination/Pagination";
import LoadingCircle from "../Common/Loading/LoadingCircle";
import { useSearchParams } from "react-router-dom";



const Listings: React.FC = observer(() => {

    const {listingsPageStore} = useRootStore();
    const {getListings, clearListingsPage, isLoading, listings} = listingsPageStore
    let [searchParams] = useSearchParams();

    let params = searchParams.toString()

    useEffect(() => {
        getListings()
    }, [getListings, params]);

    useEffect(() => {
        return () => clearListingsPage();
    }, [clearListingsPage])

    return (
        <>
            <div className="listing-title">
                <h2 className="lobster-text">All Listings</h2>
                <ListingsFilterSort />
            </div>
            <div className="listings-screen">
                {isLoading && 
                <div className="loading-container">
                    <LoadingCircle/>
                </div>}
                {!isLoading && <div className="listings-container">
                    {listings.map(listing => {
                        return (
                            <Listing key={listing._id} listing={listing} />
                        )
                    })}
                </div>}
                {!isLoading && <div className="pagination-box">
                    <Pagination />
                </div>}
            </div>
        </>
    )
})

export default Listings;