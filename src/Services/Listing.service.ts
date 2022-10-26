import axios, {AxiosError} from "axios";
import { ResponseMessage, ResultStatus } from "../Types/auth.types";
import { NewListingReq, PagingParams, PaginatedListings, CarListing, ListingId, DeleteListingReq } from "../Types/listing.type";
import { environment } from "../Env/Env";

export const getListingPage = async(pagingParams: PagingParams): Promise<PaginatedListings> => {
    return await axios.get<PaginatedListings>(`${environment.wishlist_API}/listing/getListings`, {params: pagingParams}).then(res => {
        return res.data;
    }).catch(error => {
        return error;
    });
}

export const getListingDetails = async(id:ListingId): Promise<CarListing> => {
    return await axios.get<CarListing>(`${environment.wishlist_API}/listing/getListing`, {params: id}).then(res => {
        return res.data;
    }).catch(error => {
        return error;
    })
}

export const postNewListing = async(newListing:NewListingReq): Promise<ResultStatus> =>  {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${newListing.token}`
        }
    }

    return await axios.post<ResponseMessage>(`${environment.wishlist_API}/listing/addListing`, newListing.listingData, config).then(res => {
        return setResult(true, res.data.message);
    }).catch((error: AxiosError<ResponseMessage>) => {
        if (error.response?.data !== undefined) {
            return setResult(false, error.response.data.message);
        }
        return setResult(false, "Something went wrong, try again.");
    });
}

const setResult = (isSuccessful:boolean, message: string): ResultStatus => {
    const result:ResultStatus = {
        isSuccessful: isSuccessful,
        message: message,
    }
    return result;
}

export const deleteListing = async(deleteRequest: DeleteListingReq): Promise<ResultStatus> => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${deleteRequest.token}`,
        },
        params: {id: deleteRequest.id},
    }

    return await axios.delete<ResponseMessage>(`${environment.wishlist_API}/listing/deleteListing`, config).then(res => {
        console.log(res)
        return setResult(true, res.data.message);
    }).catch((error: AxiosError<ResponseMessage>) => {
        if (error.response?.data !== undefined) {
            return setResult(false, error.response.data.message);
        }
        return setResult(false, "Something went wrong, try again.");
    });
}


