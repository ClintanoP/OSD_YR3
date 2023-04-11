import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../services/listing.service';
import { Router } from '@angular/router';
import * as uuid from 'uuid';
import { Listing } from 'src/app/model/listing/listing.model';
import { Subscription } from 'rxjs';
import { ListingStore } from '../../store/listing.store';
import { UserService } from '../../services/user.service';
import { CognitoService, IUser } from '../../services/cognito.service';
import * as AWS from 'aws-sdk';
import { Amplify, Auth} from 'aws-amplify';
import { Storage } from '@aws-amplify/storage';
import { StorageAccessLevel } from '@aws-amplify/storage/lib/types';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css']
})
export class CreateListingComponent {

  createListingSub?: Subscription;
  user:IUser;
  tempURL: string;

  constructor(private store:ListingStore, private listingService: ListingService, private router: Router, private userService: UserService, private cognitoService: CognitoService) {
     this.user = {} as IUser; 
     this.cognitoService.getUser()
      .then((user: any) => {
      this.user = user.attributes;
      console.log(this.user);
    });
    this.tempURL = '';
    }

  onSubmit(submittedForm: {value: {title:any; description:any, price:number; image_url:any; seller: {name: string, email: string, phone: string}}; invalid:any}){
    if (submittedForm.invalid){
      return;
    }
    
    const listing: any = {
      title: submittedForm.value.title,
      description: submittedForm.value.description,
      price: submittedForm.value.price,
      image_url: this.tempURL,
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

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
  
    try {
      Amplify.configure({
        Auth:{
          identityPoolId: environment.cognito.identityPoolId,
          region: environment.cognito.userPoolRegion,
          userPoolId: environment.cognito.userPoolId,
          userPoolWebClientId: environment.cognito.userPoolWebClientId
        },
        Storage: {
          AWSS3: {
            bucket: 's00209545-osd-project-images',
            region: 'eu-west-1', // Add your bucket region here
            level: 'public',
          }
        }
      });
      
      const params: any = {
        key: file.name,
        contentType: file.type,
        contentDisposition: `attachment;filename="${file.name}"`,
        metadata: {},
      };

      // Upload file to S3 using Amplify Storage module
      const result = await Storage.put(params.key, file, {
        contentType: params.contentType,
        level: params.level,
        metadata: params.metadata
      });
  
      // If successful, set the image URL to the S3 object URL
      this.tempURL = 'https://s00209545-osd-project-images.s3.eu-west-1.amazonaws.com/public/'+file.name;
    } catch (error) {
      console.error(error);
    }
  }
}
