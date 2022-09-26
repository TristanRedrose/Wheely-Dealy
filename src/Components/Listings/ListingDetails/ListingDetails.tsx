import React, { useEffect } from "react";
import "./ListingDetails.css"
import { useParams, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useListingsStore } from "../../../Context/ListingsContext";
import LoadingCircle from "../../Common/Loading/LoadingCircle";

const ListingDetails: React.FC = observer(() => {

    const navigate = useNavigate()

    const { id } = useParams();
    const {getListing, clearListing, listing, isLoading, redirect} = useListingsStore();

    useEffect(()=> {
        window.scrollTo(0,0);
        
        if (!id || !parseInt(id) || redirect){
            navigate("/*");
        } else {
            getListing(parseInt(id));
        }

        return () => {
            clearListing();
        }
    }, [clearListing, getListing, navigate, id, redirect])

    return (
        <div className="content-body">
            {isLoading && <div className="loading-container-2">
                <LoadingCircle />
            </div>}
            {!isLoading && <div className="details-container">
                <div className="details-image-container">
                    <img src={"../" + listing.image} alt="car" className="details-image"></img>
                </div>
                <div className="details-info-container">
                    <div className="info-box-1">
                        <p><span>Company:</span> {listing.make}</p>
                        <p><span>Type:</span> {listing.type}</p>
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