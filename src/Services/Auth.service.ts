import axios, { AxiosError } from "axios";
import { User, AuthResponse, Session, Registration, userCheckResponse } from "../Types/auth.types";
import { environment } from "../Env/Env";

export const login = async (user: User): Promise<undefined | string> => {
    const result = await axios.post<AuthResponse>(`${environment.wishlist_API}/login`, user).then(res => {
        const session: Session = {
            token: res.data.token,
            username: user.username,
            validTo: res.data.exp,
        };
        setSession(session);
        return undefined;
    }).catch((error: AxiosError<AuthResponse>) => {
        return error.response?.data.message;
    });

    return result;
}

export const register = async(registration: Registration): Promise<undefined | string> => {
    const result = await axios.post<AuthResponse>(`${environment.wishlist_API}/register`, registration).then(res => {
        const session: Session = {
            token: res.data.token,
            username: registration.username,
            validTo: res.data.exp,
        };
        setSession(session);
        return undefined;
    }).catch((error: AxiosError<AuthResponse>) => {
        return error.response?.data.message;
    });

    return result;
}

const setSession = (session: Session): void => {
    localStorage.setItem('CurrentSession', JSON.stringify(session));
}

export const logOut = (): void => {
    localStorage.clear();
};

export const checkUser = async(username: string): Promise<boolean> => {
    let userExists = false;
    await axios.post<userCheckResponse>(`${environment.wishlist_API}/checkUser`,{username: username}).then(res => {
        userExists = res.data.userExists;
    }).catch(error => {
        console.error('There was an error!');
    });
    return userExists;
}
