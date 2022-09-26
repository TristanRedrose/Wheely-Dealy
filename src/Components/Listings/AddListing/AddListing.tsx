import React, {useEffect} from "react";
import { useListingsStore } from "../../../Context/ListingsContext";
import { companyList } from "../../../Stores/MockLists";
import { observer } from "mobx-react-lite";
import "./AddListing.css"
import { useNavigate } from "react-router-dom";
import LoadingCircle from "../../Common/Loading/LoadingCircle";

const AddListing: React.FC = observer(() => {

    const {setNewListingValue, addNewListing, message, redirect, clearAddListings,isLoading} = useListingsStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (redirect === true) {
            navigate("/listings");
        }
        return () => clearAddListings();
    }, [clearAddListings, navigate, redirect]);

    return (
        <div className="main-body">
            <div className="listing-title">
                <h2 className="lobster-text">Add Listing</h2>
            </div>
            <div className="form-container">
                {message && <h4 className="form-message">{message}</h4>}
                {!isLoading && message !== "Listing added" &&
                    <form className="add-listing-form" onSubmit={(e) => {e.preventDefault(); addNewListing()}}>
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
                        <input className="submit-button-div" type="submit" value="SUBMIT"/>
                    </form>
                }
                {isLoading && <LoadingCircle />}
            </div>
        </div>
    )
})

export default AddListing;