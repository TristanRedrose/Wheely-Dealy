import { makeObservable, observable, action } from "mobx";
import { Session } from "../../Types/auth.types";
import { AuthStore } from "./AuthStore";
import { NotificationStore } from "../NotificationStore";

export class SessionStore {

    sessionActive: boolean = false;

    sessionUser: string = '';

    sessionEnd: NodeJS.Timeout | null = null;

    authStore: AuthStore;

    notificationStore: NotificationStore;

    constructor(authStore: AuthStore, notificationStore: NotificationStore) {
        this.authStore = authStore;
        this.notificationStore = notificationStore;
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
            notifySuccess: action,
        })
    }

    notifySuccess = (message: string) => {
        this.notificationStore.notifySuccess(message);
    }

    login = async(): Promise<void> => {
        const loginSuccess = await this.authStore.login();
        if (loginSuccess) {
            this.setSession();
            this.notifySuccess(`Welcome, ${this.sessionUser}!`);
        }
    }

    register = async(): Promise<void> => {
        const registerSuccess = await this.authStore.register();
        if (registerSuccess) {
            this.setSession();
            this.notifySuccess(`Welcome, ${this.sessionUser}!`);
        }
    }

    logOut = ():void => {
        this.authStore.logOut();
        this.setSessionUser('');
        this.setSessionActive(false);
        this.clearSessionTimeout();
        this.notifySuccess("Logged out");
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