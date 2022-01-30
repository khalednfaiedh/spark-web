import { Injectable } from "@angular/core";
import { UserInfoModel } from "./user-info.model";
import { Cookie } from "ng2-cookies";
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class Authorities {
    static getUserInfo(): UserInfoModel {
        //return jwt_decode(Cookie.get("access_token"));
        return jwt_decode(localStorage.getItem("access_token"));
    }

    static hasAutorities(autorities:string): boolean {
        return this.getUserInfo().authorities.indexOf(autorities) >= 0;
    }

    
}