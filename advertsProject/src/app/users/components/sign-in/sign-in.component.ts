import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IUser} from 'src/app/listings/services/cognito.service';
import { CognitoService } from 'src/app/listings/services/cognito.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent{

loading: boolean; user: IUser;
title="Sign in";
isVisible = false;
errorMessage: string;
onErrorPopupClose(){this.isVisible = false;}


 ngOnInit() {
  this.titleService.setTitle(this.title + " | " + environment.friendlyName);
 }

 constructor(private titleService:Title, private router: Router,
              private cognitoService: CognitoService) {

    this.loading = false;
    this.user = {} as IUser;
    this.errorMessage = "";
  }

  public signIn(): void {
    this.loading = true;
    this.cognitoService.signIn(this.user)

    .then(() => {
      this.cognitoService.getMyUser()
      this.router.navigate(['/profile']);
    }).catch(error => {
      this.loading = false;
      if (error.code === 'UserNotFoundException' || error.code === 'NotAuthorizedException') {
        this.errorMessage = 'Invalid username or password.';
        this.isVisible = true;
      } else {
        this.errorMessage = 'There was a problem signing in. Please try again.';
        console.log(error);
      }
    });
  }



}
