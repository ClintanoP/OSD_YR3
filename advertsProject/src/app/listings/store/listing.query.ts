import { Injectable } from "@angular/core";
import { Listing } from "src/app/model/listing/listing.model";
import { ID, EntityStore, StoreConfig, EntityState, QueryEntity, QueryConfig, Order } from "@datorama/akita";
import { ListingState, ListingStore } from "./listing.store";

@QueryConfig({
    sortBy: 'title',
    sortByOrder: Order.ASC
})

@Injectable({
    providedIn: 'root'
})
export class ListingQuery extends QueryEntity<ListingState> {
    
    selectAreListingLoaded$ = this.select(state => {
        console.log(state.areListingLoaded);
        return state.areListingLoaded;
    });

    constructor(protected override store: ListingStore){
        super(store);
    }
}
