export interface User {
    uid: string;
    email: string;
    displayName: string;         //Para autenticar con google
    emailVerified: boolean;
}