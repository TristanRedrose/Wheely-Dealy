import React, { useEffect } from "react";
import "./ListingDetails.css"
import { useParams, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useListingsStore } from "../../../Context/ListingsContext";
import LoadingCircle from "../../Common/Loading/LoadingCircle";
import PageNotFound from "../../404Page/PageNotFound";

const ListingDetails: React.FC = observer(() => {

    const navigate = useNavigate()

    const { id } = useParams();
    const { clearListing, listing, isLoading} = useListingsStore();

    useEffect(()=> {
        window.scrollTo(0,0);

        return () => {
            clearListing();
        }

    }, [clearListing, navigate, id])

    return (
        <div className="content-body">
            {isLoading && <div className="loading-container-2">
                <LoadingCircle />
            </div>}
            {!isLoading && !listing &&<PageNotFound text="listing" />}
            {!isLoading && listing && <div className="details-container">
                <div className="details-image-container">
                    <img src={listing.image} alt="car" className="details-image"></img>
                </div>
                <div className="details-info-container">
                    <div className="info-box-1">
                        <p><span>Owner:</span> {listing.listedby.username}</p>
                        <p><span>Company:</span> {listing.company}</p>
                        <p><span>Type:</span> {listing.model}</p>
                        <p><span>Engine:</span> {listing.engine}</p>
                        <p><span>Horsepower:</span> {listing.horsepower}</p>
                        <p><span>Price:</span> ${listing.price}</p>
                    </div>
                    <div className="info-box-2">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, magni. 
                            Culpa quae labore magni porro! At saepe eveniet laudantium! Suscipit voluptas adipisci
                            dolorum cum voluptatem tenetur blanditiis accusamus doloribus molestias?
                        </p>
                    </div>
                </div>
            </div>}
        </div>
    )
})

export default ListingDetails;