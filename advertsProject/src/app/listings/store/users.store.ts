import { Injectable } from "@angular/core";
import { ID, EntityStore, StoreConfig, EntityState } from "@datorama/akita";
import { IUser } from "../services/cognito.service";

export interface UsersState extends EntityState<IUser, string> {
    areListingLoaded: boolean;
}

export function createInitialState(): UsersState {
    return {
        areListingLoaded: false
    };
}

@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'users' })
export class UsersStore extends EntityStore<UsersState> {
    constructor() {
        super(createInitialState());
    }
    
    loadUsers(user: IUser[], areUsersLoaded: boolean) {
        this.set(user);
        console.log(user);
        this.update(state => ({
            ...state,
            areUsersLoaded
        }));
    }
}
