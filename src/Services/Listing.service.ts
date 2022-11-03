import axios, {AxiosError, AxiosResponse} from "axios";
import { ResponseMessage, ResultStatus } from "../Types/auth.types";
import { PagingParams, PaginatedListings, CarListing, DeleteListingReq, NewListingData } from "../Types/listing.type";
import { environment } from "../Env/Env";

export const getListingPage = async(pagingParams: PagingParams): Promise<PaginatedListings> => {
    return await axios.get<PaginatedListings>(`${environment.wishlist_API}/listings`, {params: pagingParams}).then(res => {
        return res.data;
    }).catch(error => {
        return error;
    });
}

export const getListingDetails = async(id:string): Promise<CarListing | undefined> => {
    return await axios.get<CarListing>(`${environment.wishlist_API}/listings/${id}`).then(res => {
        return res.data;
    }).catch(error => {
        console.log(error);
        return undefined;
    })
}

export const postNewListing = async(token:string, listingData: NewListingData): Promise<ResultStatus> =>  {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    return await axios.post<ResponseMessage>(`${environment.wishlist_API}/listings`,listingData, config).then(res => {
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
    }

    return await axios.delete<AxiosResponse>(`${environment.wishlist_API}/listings/${deleteRequest.id}`, config)
        .then(() => setResult(true, "Listing removed"))
        .catch((error: AxiosError<ResponseMessage>) => {
            if (error.response?.data !== undefined) {
                return setResult(false, error.response.data.message);
            }
            return setResult(false, "Something went wrong, try again.");
        }
    );
}


