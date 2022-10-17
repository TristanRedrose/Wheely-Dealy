import axios from "axios";
import { User, AuthResponse, Session, Registration } from "../Types/auth.types";
import { environment } from "../Env/Env";

export const login = async (user: User): Promise<void> => {
    await axios.post<AuthResponse>(`${environment.wishlist_API}/login`, user).then(res => {
        const session: Session = {
            token: res.data.token,
            username: user.username,
            validTo: res.data.exp,
        };
        setSession(session);
    }).catch(error => {
        console.error('There was an error!', error);
    });
}

export const register = async(registration: Registration): Promise<void> => {
    await axios.post<AuthResponse>(`${environment.wishlist_API}/register`, registration).then(res => {
        const session: Session = {
            token: res.data.token,
            username: registration.username,
            validTo: res.data.exp,
        };
        setSession(session);
    }).catch(error => {
        console.error('There was an error!', error);
    });
}

const setSession = (session: Session): void => {
    localStorage.setItem('CurrentSession', JSON.stringify(session));
}

export const logOut = (): void => {
    localStorage.clear();
};
