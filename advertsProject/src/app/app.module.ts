import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateListingComponent } from './listings/components/create-listing/create-listing.component';
import { ListListingsComponent } from './listings/components/list-listings/list-listings.component';
import { SignUpComponent } from './users/components/sign-up/sign-up.component';
import { SignInComponent } from './users/components/sign-in/sign-in.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './users/components/profile/profile.component';
import { ErrorPopupComponent } from './users/components/error-popup/error-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateListingComponent,
    ListListingsComponent,
    SignUpComponent,
    SignInComponent,
    ProfileComponent,
    ErrorPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
