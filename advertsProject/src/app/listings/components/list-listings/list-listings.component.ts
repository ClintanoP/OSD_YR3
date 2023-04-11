import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ListingService } from '../../services/listing.service';
import { Listing } from 'src/app/model/listing/listing.model';
import { Observable, Subscription } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { ListingQuery } from '../../store/listing.query';
import { ListingState } from '../../store/listing.store';

@Component({
  selector: 'app-list-listings',
  templateUrl: './list-listings.component.html',
  styleUrls: ['./list-listings.component.css'],
})

export class ListListingsComponent implements OnInit, OnDestroy {
  
  listingToBeUpdated: Listing | any;
  isUpdateActivated = false;
  listListingsSub?: Subscription;
  deleteListingSub?: Subscription;
  updateListingSub?: Subscription;
  
  lState?: ListingState;

  listings: Listing[] = [];

  listings$: Observable<Listing[]> = this.ListingQuery.selectAll();

  constructor(private listingService: ListingService, private ListingQuery: ListingQuery) {
    this.listings$ = this.ListingQuery.selectAreListingLoaded$.pipe(
      filter(areListingLoaded => !areListingLoaded),
      switchMap(() =>  this.listingService.getAllListings())
    )
  }

  ngOnInit() {
    this.listings$ = this.listingService.getAllListings();
  }

  togglePhone(list: Listing) {
    list.showPhone = !list.showPhone;
  }


  showPhoneNumber(list: Listing) {
    const id = "phone_" + list._id;
    const phoneNumberElement = document.getElementById(id);
    if (phoneNumberElement) {
      phoneNumberElement.innerHTML = `Phone: ${list.seller.phone}`;
      phoneNumberElement.classList.remove('d-none');
    }
  }
  
  hidePhoneNumber(list: Listing) {
    const id = "phone_" + list._id;
    const phoneNumberElement = document.getElementById(id);
    if (phoneNumberElement) {
      phoneNumberElement.innerHTML = "";
    }
  }
  
  

  

  deleteListing(listingId: string){
    this.deleteListingSub = this.listingService.deleteListing(listingId).subscribe(result => {
      console.log(result);
    })
  }

  showUpdateForm(listing: Listing){
    this.isUpdateActivated = true;
    this.listingToBeUpdated = {...listing};
  }

  updateListing(updateForm: {value: Listing;}){
    this.updateListingSub = this.listingService.updateListing(
      this.listingToBeUpdated.ID, updateForm.value
    ).subscribe(result => console.log(result));

    this.isUpdateActivated = false;
    this.listingToBeUpdated = null;
  }


  ngOnDestroy(){
    if (this.listListingsSub){
      this.listListingsSub.unsubscribe();
    }
    if (this.deleteListingSub) {
      this.deleteListingSub.unsubscribe();
    }
    if (this.updateListingSub){
      this.updateListingSub.unsubscribe();
    }
  }
}
