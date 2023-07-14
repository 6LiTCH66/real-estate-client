export interface UserAuthentication {
    _id?: string,
    email: string,
    password: string,
    first_name?: string,
    last_name?: string,
    phone?: string,
    isAgent?: boolean,

    // login: (user: UserAuthentication) => void;
    // signup: (user: UserAuthentication) => void
}