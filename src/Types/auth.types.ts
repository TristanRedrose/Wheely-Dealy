export type User = {
    username: string;
    password: string;
}

export type Registration = {
    username: string;
    email: string;
    password: string;
}

export type AuthResponse = {
    message: string;
    token: string;
    exp: number;
}

export type Session = {
    token: string,
    username: string,
    validTo: number,
}

export type userCheckResponse = {
    userExists: boolean,
}