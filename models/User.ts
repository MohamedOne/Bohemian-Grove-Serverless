export interface IUser {
    userName: string;
    displayName: string;
    profileImg: string;
    email?: string;
    followers?: string[];
    following?: string[];
}