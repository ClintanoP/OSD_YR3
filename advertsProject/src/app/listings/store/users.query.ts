import { Inject, Injectable } from "@angular/core";
import { ID, EntityStore, StoreConfig, EntityState, QueryEntity, QueryConfig, Order } from "@datorama/akita";
import { UsersState, UsersStore } from "./users.store";


@QueryConfig({
    sortBy: 'name',
    sortByOrder: Order.ASC
})

@Injectable({
    providedIn: 'root'
})
export class UsersQuery extends QueryEntity<UsersState> {
    selectAreUsersLoaded$ = this.select(state => {
      console.log(state["areUsersLoaded"]);
      return state["areUsersLoaded"];
    });
  
    constructor(@Inject(UsersStore) protected override store: UsersStore){
      super(store);
    }
  }
