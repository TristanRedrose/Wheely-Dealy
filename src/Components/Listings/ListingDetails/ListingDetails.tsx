import React, { useEffect } from "react";
import "./ListingDetails.css"
import { useParams, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useListingsStore } from "../../../Context/ListingsContext";
import LoadingCircle from "../../Common/Loading/LoadingCircle";
import PageNotFound from "../../404Page/PageNotFound";
import { useModalStore } from "../../../Context/ModalContext";
import { useAuthStore } from "../../../Context/AuthContext";

const ListingDetails: React.FC = observer(() => {

    const navigate = useNavigate()

    const { id } = useParams();
    const { clearListing, listing, isLoading, getListing, redirect} = useListingsStore();
    const { toggleDeleteModal } = useModalStore();
    const { sessionUser } = useAuthStore();

    useEffect(()=> {
        window.scrollTo(0,0);
        getListing(id!);
        return () => {
            clearListing();
        }

    }, [clearListing, navigate, id, getListing])

    useEffect(() => {
        if (redirect) {
            navigate("/listings");
        }
        
        return () => clearListing();
    }, [clearListing, navigate, redirect]);

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
                        <p><span>Listed by:</span> {listing.listedBy.username}</p>
                        <p><span>Company:</span> {listing.company}</p>
                        <p><span>Type:</span> {listing.model}</p>
                        <p><span>Engine:</span> {listing.engine}</p>
                        <p><span>Horsepower:</span> {listing.horsepower}</p>
                        <p><span>Price:</span> ${listing.price}</p>
                    </div>
                    <div className="info-box-2">
                        <p>{listing.description}</p>
                    </div>
                </div>
                {(sessionUser.toLowerCase() === (listing.listedBy.username).toLowerCase()) &&
                    <div className="listing-options-box">
                        <div className="option-button">
                            Update
                        </div>
                        <div className="option-button" onClick={()=> toggleDeleteModal(id!)}>
                            Delete
                        </div>
                    </div>
                }
            </div>}
        </div>
    )
})

export default ListingDetails;