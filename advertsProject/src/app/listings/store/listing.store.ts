import { Injectable } from "@angular/core";
import { Listing } from "src/app/model/listing/listing.model";
import { ID, EntityStore, StoreConfig, EntityState } from "@datorama/akita";

export interface ListingState extends EntityState<Listing, string> {
    areListingLoaded: boolean;
}

export function createInitialState(): ListingState {
    return {
        areListingLoaded: false
    };
}

@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'listing' })
export class ListingStore extends EntityStore<ListingState> {
    constructor() {
        super(createInitialState());
    }
    
    loadListing(listing: Listing[], areListingLoaded: boolean) {
        this.set(listing);
        console.log(listing);
        this.update(state => ({
            ...state,
            areListingLoaded
        }));
    }
}
