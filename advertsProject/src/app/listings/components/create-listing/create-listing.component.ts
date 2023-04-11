import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../services/listing.service';
import { Router } from '@angular/router';
import * as uuid from 'uuid';
import { Listing } from 'src/app/model/listing/listing.model';
import { Subscription } from 'rxjs';
import { ListingStore } from '../../store/listing.store';
import { UserService } from '../../services/user.service';
import { CognitoService, IUser } from '../../services/cognito.service';


@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css']
})
export class CreateListingComponent {

  createListingSub?: Subscription;
  user:IUser;

  constructor(private store:ListingStore, private listingService: ListingService, private router: Router, private userService: UserService, private cognitoService: CognitoService) {
     this.user = {} as IUser; 
     this.cognitoService.getUser()
      .then((user: any) => {
      this.user = user.attributes;
      console.log(this.user);
    });
    }

  onSubmit(submittedForm: {value: {title:any; description:any, price:number; image_url:any; seller: {name: string, email: string, phone: string}}; invalid:any}){
    if (submittedForm.invalid){
      return;
    }
    
    const listing: any = {
      title: submittedForm.value.title,
      description: submittedForm.value.description,
      price: submittedForm.value.price,
      image_url: submittedForm.value.image_url,
      seller: {
        name: this.user.name ?? "",
        email: this.user.email ?? "",
        phone: this.user['custom:phoneNumber'] ?? ""
      }
    };

    this.createListingSub = this.listingService.createListing(listing).subscribe(result => {
      this.router.navigateByUrl('');
    })
  }
}
