import React, {useEffect} from "react";
import { observer } from "mobx-react-lite";
import "./ListingForm.css"
import { useNavigate } from "react-router-dom";
import LoadingCircle from "../../Common/Loading/LoadingCircle";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRootStore } from "../../../Context/StoresContext";

const AddListing: React.FC = observer(() => {

    const {listingStore, listingFormStore} = useRootStore();
    const {setNewListingValue, error, clearListingForm, listingData, submitEnabled} = listingFormStore;
    const {addNewListing, message, actionSuccess, clearListingData ,isLoading, notify, companyList} = listingStore;
    const navigate = useNavigate();

    useEffect(() => {
        if (actionSuccess) notify();
        let timeout = setTimeout(() => navigate("/listings"), 2000);
        if (!actionSuccess) {
            clearTimeout(timeout);
        }
        
        return () => clearTimeout(timeout);
    }, [ navigate, actionSuccess, notify]);

    useEffect(() => {
        return () =>  {clearListingData(); clearListingForm()};
    }, [clearListingData, clearListingForm]);


    return (
        <>
            <ToastContainer />
            <div className="listing-title">
                <h2 className="lobster-text">Add Listing</h2>
            </div>
            <div className="form-container">
                {error && !actionSuccess && <h4 className="form-message">{message}</h4>}
                {actionSuccess && 
                    <div className="success-div">
                        <h4>Listing added</h4>
                    </div>
                }
                {!isLoading && !actionSuccess &&
                    <form className="add-listing-form" onSubmit={(e) => {e.preventDefault(); addNewListing(listingData)}}>
                        <div className="form-logo-box">
                            <img className="form-logo" src="../Images/Logo/car-logo.png" alt="car-logo" />
                        </div>
                        <div className="form-select-container">
                            <select className="form-select" required name="company" defaultValue="" title="company-filter" onChange={(e) => setNewListingValue(e)}>
                                <option value="" disabled>Company</option>
                                {companyList.map(item => {
                                    return <option key={item.id} value={item.company}>{item.company}</option>
                                })}
                            </select>
                            <select className="form-select" required name="engine" title="company-filter" defaultValue="" onChange={(e) => setNewListingValue(e)}>
                                <option value="" disabled>Engine</option>
                                <option value="petrol">Petrol</option>
                                <option value="diesel">Diesel</option>
                            </select>
                        </div>
                        <div className="input-div">
                            <div className="form-input-container">
                                <label htmlFor="type">Type:</label>
                                <input name="type" className="form-input" type="text" placeholder="Type" onChange={(e) => setNewListingValue(e)} />
                            </div>
                            <div className="form-input-container">
                                <label htmlFor="type">Horsepower:</label>
                                <input name="horsepower" className="form-input" type="number" min="80" max="150" placeholder="Horsepower" onChange={(e) => setNewListingValue(e)}/>
                            </div>
                        </div>
                        <div className="input-div">
                            <div className="form-input-container">
                                <label htmlFor="type">Price:</label>
                                <input name="price" className="form-input" type="number" min="0" placeholder="Price" onChange={(e) => setNewListingValue(e)}/>
                            </div>
                            <div className="form-input-container">
                                <label htmlFor="type">Image:</label>
                                <input name="image" className="form-input" type="text" placeholder="Image-url" onChange={(e) => setNewListingValue(e)}/>
                            </div>
                        </div>
                        <div className="input-div">
                            <div className="form-description-container">
                                <label htmlFor="description">Description:</label>
                                <textarea name="description" className="listing-description"  placeholder="Description..." onChange={(e) => setNewListingValue(e)}/>
                            </div>
                        </div>
                        <input className="submit-button-div" type="submit" value="SUBMIT" disabled={!submitEnabled}/>
                    </form>
                }
                {isLoading && <LoadingCircle />}
            </div>
        </>
    )
})

export default AddListing;