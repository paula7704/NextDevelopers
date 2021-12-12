import { UserData } from "./user-data.model";

export class SessionData{
    token?: string;
    user?: UserData;
    isLoggedIn?: boolean = false;

}
