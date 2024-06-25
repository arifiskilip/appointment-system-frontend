import { AccessTokenModel } from "./accessTokenModel";

export class LoginResponseModel{
    id:number;
    firstName:string;
    lastName:string;
    email:string;

    accessToken:AccessTokenModel;
}