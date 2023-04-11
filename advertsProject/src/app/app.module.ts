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
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './users/components/admin-dashboard/admin-dashboard.component';
import { AdminGuard } from './auth/admin.guard';
import { GeneralUserGuard } from './auth/general-using.guard';


@NgModule({
  declarations: [
    AppComponent,
    CreateListingComponent,
    ListListingsComponent,
    SignUpComponent,
    SignInComponent,
    ProfileComponent,
    ErrorPopupComponent,
    AdminDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AdminGuard, GeneralUserGuard, AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
