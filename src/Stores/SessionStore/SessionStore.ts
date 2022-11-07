import { makeObservable, observable, action } from "mobx";
import { Session } from "../../Types/auth.types";
import { AuthStore } from "./AuthStore";
import { toast } from "react-toastify";

export class SessionStore {

    sessionActive: boolean = false;

    sessionUser: string = '';

    sessionEnd: NodeJS.Timeout | null = null;

    authStore: AuthStore

    constructor(authStore: AuthStore) {
        this.authStore = authStore;
        makeObservable(this, {
            sessionActive: observable,
            setSession: action,
            setSessionActive: action,
            sessionUser: observable,
            setSessionUser: action,
            sessionEnd: observable,
            setSessionEnd: action,
            clearSessionTimeout: action,
            login: action,
            register: action,
            logOut:action,
            isSessionActive: action,
            notify: action,
        })
    }

    notify = (message: string) => toast(message, {
        position:'top-right',
        autoClose:1000,
        theme:'dark',
        }
    );

    login = async(): Promise<void> => {
        const loginSuccess = await this.authStore.login();
        if (loginSuccess) {
            this.setSession();
            this.notify("Logged in");
        }
    }

    register = async(): Promise<void> => {
        const registerSuccess = await this.authStore.register();
        if (registerSuccess) {
            this.setSession();
            this.notify("Logged in");
        }
    }

    logOut = ():void => {
        this.authStore.logOut();
        this.setSessionUser('');
        this.setSessionActive(false);
        this.clearSessionTimeout();
        this.notify("Logged out");
    }

    isSessionActive = (): void => {
        const currentSession = localStorage.getItem("CurrentSession");

        if (currentSession) {
            this.setSessionActive(true);
            if (this.sessionUser === '') this.setSessionUser(JSON.parse(currentSession).username);
            return;
        };

        this.setSessionActive(false);
    }

    setSession = (): void => {
        const currentSession = localStorage.getItem("CurrentSession");
        if (currentSession) {
            const session: Session = JSON.parse(currentSession);
            const token = session.token;
            if (token) this.setSessionActive(true);
            this.setSessionUser(session.username);
            this.setSessionEnd(session.validTo);
            return;
        }
        this.setSessionActive(false);
        return;
    }

    setSessionActive = (value: boolean):void => {
        this.sessionActive = value;
    }

    setSessionUser = (username:string): void => {
        this.sessionUser = username;
    }

    setSessionEnd = (validTo: number): void => {
        this.clearSessionTimeout();

        this.sessionEnd = setTimeout(() => this.logOut() , (validTo - Math.floor(Date.now() / 1000)) * 1000);
    }

    clearSessionTimeout = (): void => {
        if (this.sessionEnd) clearTimeout(this.sessionEnd);
    }
}