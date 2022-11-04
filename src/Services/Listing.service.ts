import axios, {AxiosError, AxiosResponse} from "axios";
import { ResponseMessage, ResultStatus } from "../Types/auth.types";
import { PagingParams, PaginatedListings, CarListing, ListingData } from "../Types/listing.type";
import { environment } from "../Env/Env";
import { Session } from "../Types/auth.types";

const getToken = (): string | null => {
    let token: (string | null) = null
    const currentSession = localStorage.getItem("CurrentSession");
    if (currentSession) {
        const session: Session = JSON.parse(currentSession);
        token = session.token;
    }
    return token;
}

axios.interceptors.request.use(
    (config) => {
        const token = getToken()
        if (token) {
            config.headers!['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        Promise.reject(error)
    }
)

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
        return undefined;
    })
}

export const postNewListing = async(listingData: ListingData): Promise<ResultStatus> =>  {
    return await axios.post<ResponseMessage>(`${environment.wishlist_API}/listings`,listingData).then(res => {
        return setResult(true, res.data.message);
    }).catch((error: AxiosError<ResponseMessage>) => {
        if (error.response?.data !== undefined) {
            return setResult(false, error.response.data.message);
        }
        return setResult(false, "Something went wrong, try again.");
    });
}

export const updateListing = async(listingData: ListingData, id:string): Promise<ResultStatus> =>  {
    return await axios.patch<ResponseMessage>(`${environment.wishlist_API}/listings/${id}`, listingData)
        .then(() => setResult(true, 'Listing updated'))  
        .catch((error: AxiosError<ResponseMessage>) => {
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

export const deleteListing = async(id:string): Promise<ResultStatus> => {
    return await axios.delete<AxiosResponse>(`${environment.wishlist_API}/listings/${id}`)
        .then(() => setResult(true, "Listing removed"))
        .catch((error: AxiosError<ResponseMessage>) => {
            if (error.response?.data !== undefined) {
                return setResult(false, error.response.data.message);
            }
            return setResult(false, "Something went wrong, try again.");
        }
    );
}


