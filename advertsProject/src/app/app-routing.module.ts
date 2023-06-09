import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './users/components/profile/profile.component';
import { SignUpComponent } from './users/components/sign-up/sign-up.component';
import { SignInComponent } from './users/components/sign-in/sign-in.component';
import { CreateListingComponent } from './listings/components/create-listing/create-listing.component';
import { ListListingsComponent } from './listings/components/list-listings/list-listings.component';
import { AdminDashboardComponent } from './users/components/admin-dashboard/admin-dashboard.component';
import { GeneralUserGuard } from './auth/general-using.guard';
import { AdminGuard } from './auth/admin.guard';


const routes: Routes = [  
  {
    path: 'profile', 
    component: ProfileComponent, canActivate: [GeneralUserGuard]
  },{
    path: 'signIn',
    component: SignInComponent,
  },{
    path: 'signUp',
    component: SignUpComponent,
  },{
    path: 'createListing',
    component: CreateListingComponent, canActivate: [GeneralUserGuard]
  },{
    path: 'home',
    component: ListListingsComponent
  },{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },{
    path: 'adminDashboard',
    component: AdminDashboardComponent, canActivate: [AdminGuard]
  },{
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
