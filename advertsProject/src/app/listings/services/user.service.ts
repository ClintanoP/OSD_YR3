import { Injectable } from '@angular/core';
import { IUser } from './cognito.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
    public UserType?:string;
    public UserPhoneNumber?:string;
    constructor() { }

    user?:IUser;

    isAdmin(): boolean {
    if (this.UserType=="admin")
        return true;
    else 
        return false;
    }
}
