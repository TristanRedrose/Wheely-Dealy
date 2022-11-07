import axios from "axios";
import { Session } from "../../Types/auth.types";

const getToken = (): string | null => {
    let token: (string | null) = null
    const currentSession = localStorage.getItem("CurrentSession");
    if (currentSession) {
        const session: Session = JSON.parse(currentSession);
        token = session.token;
    }
    return token;
}

const interceptor = axios.interceptors.request.use(
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

export default interceptor;