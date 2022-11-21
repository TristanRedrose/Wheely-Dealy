import { makeObservable, observable, action } from "mobx";
import { login, register, logOut, checkUser } from "../../Services/Auth.service";
import { Registration, User } from "../../Types/auth.types";

export class AuthStore {
    
    username: string = '';

    email: string = '';

    password: string = '';

    passConfirm: string = '';

    errorCode: number = 0;

    errorMessage: string = '';

    user: User = {
        username: this.username,
        password: this.password,
    }

    userNameTaken: boolean = false;

    constructor() {
        makeObservable(this, {
            username:observable,
            email:observable,
            password: observable,
            passConfirm: observable,
            errorCode: observable,
            errorMessage: observable,
            user: observable,
            login: action,
            register: action, 
            logOut: action,
            setError: action,
            clearData: action,
            setUsername:action,
            setEmail: action,
            setPassword: action,
            setPassConfirm: action,
            validateLoginData: action,
            checkUser:action,
            userNameTaken:observable,
            setUserNameTaken: action,
        })
    }

    setUsername = (username: string): void => {
        this.username = username;
    }

    setEmail = (email: string): void => {
        this.email = email;
    }

    setPassword = (password: string): void => {
        this.password = password;
    }

    setPassConfirm = (passConfirm: string): void => {
        this.passConfirm = passConfirm;
    }

    clearData = (): void => {
        this.setUsername('');
        this.setEmail('');
        this.setPassword('')
        this.setPassConfirm('');
        this.setError(0, '');
    }

    setError = (errorCode:number, errorMessage:string) => {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }

    login = async(): Promise<boolean> => {
        await this.validateLoginData();
        if (this.errorCode === 0) {
            const user: User = {
                username: this.username,
                password: this.password,
            }

            const response = await login(user);
            
            if (!response.isSuccessful) this.setError(7, response.message);

            return response.isSuccessful;
        }
        return false;
    }

    register = async(): Promise<boolean> => {
        await this.validateRegistrationData();
        if (this.errorCode === 0) {
            const registration: Registration = {
                username: this.username,
                email: this.email,
                password: this.password,
            }

            const response = await register(registration);

            if (!response.isSuccessful) this.setError(7, response.message);

            return response.isSuccessful
        }

        return false;
    }

    logOut = (): void => {
        logOut();
        this.clearData();
    }

    validateLoginData = async(): Promise<void> => {
        this.setError(0, "");
        
        if (this.username.length === 0) {
            this.setError(1, "Username cannot be empty");
            return;
        }

        if (this.username.includes(' ')) {
            this.setError(1, "Username cannot contain whitespaces");
            return;
        }

        if (this.password.length === 0) {
            this.setError(2, "Password cannot be empty");
            return;
        }
    }

    validateRegistrationData = async():Promise<void> => {
        this.setError(0, "");

        if (this.username.length === 0) {
            this.setError(1, "Username cannot be empty");
            return;
        }

        if (this.username.includes(' ')) {
            this.setError(1, "Username cannot contain whitespaces");
            return;
        }

        if (this.email.length === 0) {
            this.setError(2, "Email cannot be empty");
            return;
        }

        if (this.email.includes(' ')) {
            this.setError(2, "Email cannot contain whitespaces");
            return;
        }

        if ((this.email.includes('@',2) !== true) || (this.email.endsWith('.com') !== true) || ((this.email.split('@').length -1) !== 1)) {
            this.setError(2, "Please add a valid email");
            return;
        }

        if (this.password.length === 0) {
            this.setError(3, "Password cannot be empty");
            return;
        }

        if (this.passConfirm.length === 0) {
            this.setError(4, "Please confirm password");
            return;
        }

        if (this.password !== this.passConfirm) {
            this.setError(5, "Passwords must match");
            return;
        }

    }

    setAuthData = (event: React.FormEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value.trim();

        if (this.errorCode !== 0) {
            this.setError(0,'');
        }

        switch (name) {
            case "username":
                this.setUsername(value);
                break;
            case "email":
                this.setEmail(value);
                break;
            case "password":
                this.setPassword(value);
                break;
            case "confirm":
                this.setPassConfirm(value);
                break;
        }  
    }

    checkUser = async(username:string): Promise<void> =>{
        this.setUserNameTaken(false);
        if (username === '') return;
        const userExists = await checkUser(username);
        if (userExists) {
            this.setUserNameTaken(true)
        }
    }

    setUserNameTaken = (value:boolean): void => {
        this.userNameTaken = value;
    }
}