import axios, { AxiosError } from "axios";
import { User, AuthResponse, Session, Registration, UserCheckResponse, ResultStatus, ResponseMessage } from "../Types/auth.types";
import { environment } from "../Env/Env";

export const login = async (user: User): Promise<ResultStatus> => {
    return await axios.post<AuthResponse>(`${environment.wishlist_API}/auth/login`, user).then(res => {
        console.log(res)
        let sessionData = res.data.session
        const session: Session = {
            token: sessionData.token,
            username: sessionData.user,
            validTo: sessionData.exp,
        };
        setSession(session);
        return setResult(true, '');
    }).catch((error: AxiosError<ResponseMessage>) => {
        if (error.response?.data !== undefined) {
            return setResult(false, error.response.data.message);
        }
        return setResult(false, "Something went wrong, try again.");
    });

}

export const register = async(registration: Registration): Promise<ResultStatus> => {
    return await axios.post<AuthResponse>(`${environment.wishlist_API}/auth/register`, registration).then(res => {
        let sessionData = res.data.session
        const session: Session = {
            token: sessionData.token,
            username: sessionData.user,
            validTo: sessionData.exp,
        };
        setSession(session);
        return setResult(true, '');
    }).catch((error: AxiosError<ResponseMessage>) => {
        if (error.response?.data !== undefined) {
            return setResult(false, error.response.data.message);
        }
        return setResult(false, "Something went wrong, try again.");
    });
}

const setSession = (session: Session): void => {
    localStorage.setItem('CurrentSession', JSON.stringify(session));
}

export const logOut = (): void => {
    localStorage.clear();
};

export const checkUser = async(username: string): Promise<boolean> => {
    return await axios.post<UserCheckResponse>(`${environment.wishlist_API}/auth/checkUser`,{username: username}).then(res => {
        return res.data.userExists;
    }).catch(error => {
        console.error('There was an error!');
        return false;
    });
}

const setResult = (isSuccessful:boolean, message: string): ResultStatus => {
    const result:ResultStatus = {
        isSuccessful: isSuccessful,
        message: message,
    }
    return result;
}
