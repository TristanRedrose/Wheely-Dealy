import React from "react";
import "./ListingDetails.css"
import { useParams, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../../Context/StoresContext";
import LoadingCircle from "../../Common/Loading/LoadingCircle";
import PageNotFound from "../../404Page/PageNotFound";
import { useListingDetails } from "../../../Utils/CustomHooks/UseListingDetails";

const ListingDetails: React.FC = observer(() => {

    const { id } = useParams();
    const {listingDetailsStore, listingOperationsStore, modalStore, sessionStore} = useRootStore();
    const {listing, isLoading} = listingDetailsStore;
    const {actionSuccess} = listingOperationsStore;
    const {toggleDeleteModal} = modalStore;
    const {sessionUser} = sessionStore;

    useListingDetails();

    return (
        <div className="content-body">
            {isLoading && <div className="loading-container-2">
                <LoadingCircle />
            </div>}
            {actionSuccess && 
                <div className="success-div">
                    <h4>Listing deleted</h4>
                </div>
            }
            {(listing && !actionSuccess) && <div className="details-container">
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
                        <Link className="title-link" to={`/listings/form/${id!}`}>
                            <div className="option-button">
                                Update
                            </div>
                        </Link>
                        <div className="option-button" onClick={()=> toggleDeleteModal(id!)}>
                            Delete
                        </div>
                    </div>
                }
            </div>}
            {(!isLoading && !listing) && <PageNotFound text="listing" />}
        </div>
    )
})

export default ListingDetails;