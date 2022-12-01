import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useRootStore } from "../../Context/StoresContext";
import { useParams } from "react-router-dom";

export const useListingForm = (): void => {
    const { id } = useParams();
    const {listingOperationsStore, listingFormStore, listingDetailsStore} = useRootStore();
    const {clearListingForm, setUpdateDefaultValue} = listingFormStore;
    const {actionSuccess, clearListingOperationData} = listingOperationsStore;
    const {getListing, clearListingData, listing} = listingDetailsStore;
    const navigate = useNavigate();

    useEffect(() => {
        let timeout = setTimeout(() => {id ? navigate(`/listings/${id}`) : navigate('/listings')}, 2000);
        if (!actionSuccess) {
            clearTimeout(timeout);
        }
        
        return () => clearTimeout(timeout);
    }, [actionSuccess, navigate, id]);
    
    useEffect(() => {    
        if (id) getListing(id);
    
        return () =>  {
            clearListingOperationData(); 
            clearListingForm();
            clearListingData();
        };
    }, [clearListingOperationData, clearListingForm, id, clearListingData, getListing]);
    
    useEffect(() => {
        if (listing && id) {
            setUpdateDefaultValue(listing);
        }
    }, [listing, setUpdateDefaultValue, id]);
}
