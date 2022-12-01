import { useEffect } from "react";
import { useRootStore } from "../../Context/StoresContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const useListingDetails = ():void =>{
    const navigate = useNavigate()

    const { id } = useParams();
    const {listingDetailsStore, listingOperationsStore} = useRootStore();
    const { clearListingData, getListing} = listingDetailsStore;
    const { actionSuccess, clearListingOperationData} = listingOperationsStore;

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
}
