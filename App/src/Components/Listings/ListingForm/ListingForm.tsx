import React from "react";
import { observer } from "mobx-react-lite";
import "./ListingForm.css"
import { useParams } from "react-router-dom";
import LoadingCircle from "../../Common/Loading/LoadingCircle";
import { useRootStore } from "../../../Context/StoresContext";
import { companyList } from "../../../Stores/MockLists";
import { useListingForm } from "../../../Utils/CustomHooks/UseListingForm";

const ListingForm: React.FC = observer(() => {

    const { id } = useParams();
    const {listingOperationsStore, listingFormStore} = useRootStore();
    const {setNewListingValue, errorMessage, listingData, submitDisabled, errorCode} = listingFormStore;
    const {addNewListing, actionSuccess, isLoading, updateListing} = listingOperationsStore;
    
    useListingForm();

    return (
        <>
            <div className="listing-title">
                <h2 className="lobster-text">{id ? 'Update listing' : 'Add listing'}</h2>
            </div>
            <div className="form-container">
                {errorCode && !submitDisabled && <h4 className="form-message">{errorMessage}</h4>}
                {actionSuccess && 
                    <div className="success-div">
                        <h4>{id ? 'Listing updated' : 'Listing added'}</h4>
                    </div>
                }
                {!isLoading && !actionSuccess &&
                    <form className="add-listing-form" onSubmit={(e) => {e.preventDefault(); if (!errorCode) id ? updateListing(id, listingData) : addNewListing(listingData) }}>
                        <div className="form-logo-box">
                            <img className="form-logo" src="/Images/Logo/car-logo.png" alt="car-logo" />
                        </div>
                        <div className="form-select-container">
                            <select className="form-select" required name="company" value={listingData.company} title="company-filter" onChange={(e) => setNewListingValue(e)}>
                                <option value="" disabled>Company</option>
                                {companyList.map(item => {
                                    return <option key={item.id} value={item.company}>{item.company}</option>
                                })}
                            </select>
                            <select className="form-select" required name="engine" title="company-filter" value={listingData.engine} onChange={(e) => setNewListingValue(e)}>
                                <option value="" disabled>Engine</option>
                                <option value="petrol">Petrol</option>
                                <option value="diesel">Diesel</option>
                            </select>
                        </div>
                        <div className="input-div">
                            <div className="form-input-container">
                                <label htmlFor="type">Type:</label>
                                <input name="type" className="form-input" type="text" placeholder="Type" defaultValue={listingData.model} onChange={(e) => setNewListingValue(e)} />
                            </div>
                            <div className="form-input-container">
                                <label htmlFor="type">Horsepower:</label>
                                <input name="horsepower" className="form-input" type="number" min="80" max="150" placeholder="Horsepower" defaultValue={listingData.horsepower ? listingData.horsepower : ''} onChange={(e) => setNewListingValue(e)}/>
                            </div>
                        </div>
                        <div className="input-div">
                            <div className="form-input-container">
                                <label htmlFor="type">Price:</label>
                                <input name="price" className="form-input" type="number" min="0" placeholder="Price" defaultValue={listingData.price ? listingData.price : ''} onChange={(e) => setNewListingValue(e)}/>
                            </div>
                            <div className="form-input-container">
                                <label htmlFor="type">Image:</label>
                                <input name="image" className="form-input" type="text" placeholder="Image-url" defaultValue={listingData.image} onChange={(e) => setNewListingValue(e)}/>
                            </div>
                        </div>
                        <div className="input-div">
                            <div className="form-description-container">
                                <label htmlFor="description">Description:</label>
                                <textarea name="description" className="listing-description"  placeholder="Description..." defaultValue={listingData.description} onChange={(e) => setNewListingValue(e)}/>
                            </div>
                        </div>
                        <input className="submit-button-div" type="submit" value={id ? 'Update listing' : 'Add listing'} disabled={submitDisabled}/>
                    </form>
                }
                {isLoading && <LoadingCircle />}
            </div>
        </>
    )
})

export default ListingForm;