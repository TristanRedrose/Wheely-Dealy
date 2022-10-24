import axios, {AxiosError} from "axios";
import { ResponseMessage, ResultStatus } from "../Types/auth.types";
import { NewListingReq, PagingParams, PaginatedListings } from "../Types/listing.type";
import { environment } from "../Env/Env";

export const getListingPage = async(pagingParams: PagingParams): Promise<PaginatedListings> => {
    return await axios.get<PaginatedListings>(`${environment.wishlist_API}/listing/getListings`, {params: pagingParams}).then(res => {
        console.log(res.data.paginatedListings.listings)
        return res.data;
    }).catch((error) => {
        return error;
    });
}

export const postNewListing = async(newListing:NewListingReq): Promise<ResultStatus> =>  {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${newListing.token}`
        }
    }

    return await axios.post<ResponseMessage>(`${environment.wishlist_API}/listing/addListing`, newListing, config).then(res => {
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


