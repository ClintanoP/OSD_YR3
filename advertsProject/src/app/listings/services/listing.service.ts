import { Injectable } from '@angular/core';
import { EntityStore, EntityState } from '@datorama/akita';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Listing } from 'src/app/model/listing/listing.model';
import { ListingStore, ListingState} from 'src/app/listings/store/listing.store';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private readonly API_URL = "https://x8354e7a41.execute-api.eu-west-1.amazonaws.com/dev";

  store: ListingStore;

  constructor(private http: HttpClient, store: ListingStore) {  
    this.http = http; 
    this.store = store;
  }

  getAllListings(): Observable<Listing[]> {
    return this.http.get<any>(this.API_URL+'/listings').pipe(
      map(response => JSON.parse(response.body)),
      tap(listings =>
        this.store.loadListing(listings, true)),
    );
  }
  

  createListing(listing: Listing) : Observable<Listing> {
    return this.http.post<Listing>(this.API_URL+'/listings', listing).pipe(
      tap(value => {this.store.add([value]);})
    )
  }

  deleteListing(listingId: string): Observable<any> {
    return this.http.delete(this.API_URL + '/listings/' + listingId).pipe(
      tap(value => {this.store.remove(listingId);})
    )
  }

  updateListing(listingId: string, listing: Listing): Observable<any> {
    return this.http.put(this.API_URL+'/listings/' + listingId, listing).pipe(
      tap(value => {this.store.update(listingId, listing);})
    )
  }

}
