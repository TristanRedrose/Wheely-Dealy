import React, { useEffect } from "react";
import "./ListingDetails.css"
import { useParams, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useListingsStore } from "../../../Context/ListingsContext";
import LoadingCircle from "../../Common/Loading/LoadingCircle";
import PageNotFound from "../../404Page/PageNotFound";
import { useModalStore } from "../../../Context/ModalContext";
import Modal from "../../Common/Modal/Modal";
import { useAuthStore } from "../../../Context/AuthContext";

const ListingDetails: React.FC = observer(() => {

    const navigate = useNavigate()

    const { id } = useParams();
    const { clearListing, listing, isLoading, getListing, deleteListing, redirect} = useListingsStore();
    const { toggleModal } = useModalStore();
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
                        <div className="option-button" onClick={()=> toggleModal()}>
                            Delete
                        </div>
                    </div>
                }
            </div>}
            <Modal>
                <h4>Are you sure you want to delete listing?</h4>
                <div className="modal-button-box">
                    <div className="modal-button" onClick={()=> toggleModal()}>
                        Return
                    </div>
                    <div className="modal-button" onClick={()=> {deleteListing(id!); toggleModal()}}>
                        Delete
                    </div>
                </div>
            </Modal>
        </div>
    )
})

export default ListingDetails;