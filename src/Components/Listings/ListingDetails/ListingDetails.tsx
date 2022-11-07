import React, { useEffect } from "react";
import "./ListingDetails.css"
import { useParams, useNavigate, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../../Context/StoresContext";
import LoadingCircle from "../../Common/Loading/LoadingCircle";
import PageNotFound from "../../404Page/PageNotFound";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListingDetails: React.FC = observer(() => {

    const navigate = useNavigate()

    const { id } = useParams();
    const {listingDetailsStore, listingOperationsStore, modalStore, sessionStore} = useRootStore();
    const { clearListingData, listing, isLoading, getListing} = listingDetailsStore;
    const { actionSuccess, clearListingOperationData} = listingOperationsStore;
    const { toggleDeleteModal } = modalStore;
    const { sessionUser } = sessionStore;

    useEffect(()=> {
        window.scrollTo(0,0);
        getListing(id!);

        return () => {
            clearListingData();
            clearListingOperationData();
        }
    }, [clearListingData, id, getListing, clearListingOperationData])

    useEffect(() => {
        let timeout = setTimeout(() => navigate("/listings"), 2000) ;
        if (!actionSuccess) {
            clearTimeout(timeout);
        }
        
        return () => clearTimeout(timeout);
        
    }, [navigate, actionSuccess]);

    return (
        <div className="content-body">
            <ToastContainer />
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