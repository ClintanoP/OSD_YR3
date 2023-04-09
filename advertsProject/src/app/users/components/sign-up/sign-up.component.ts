import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CognitoService, IUser } from 'src/app/listings/services/cognito.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  loading: boolean;
  isConfirm: boolean;
  user: IUser;
  title="Sign Up";
  errorMessage: string;
  isVisible = false;
  onErrorPopupClose(){this.isVisible = false;}


  constructor(private titleService:Title,
              private router: Router,
              private cognitoService: CognitoService) {
    this.loading = false;
    this.isConfirm = false;
    this.user = {} as IUser;
    this.errorMessage = "";
   }

  ngOnInit(): void {
    this.titleService.setTitle(this.title + " | " + environment.friendlyName);
  
    this.cognitoService.getUser()
    .then((user: any) => {
      this.user = user.attributes;
    });
  }


  public signUp(): void {
    this.loading = true;
    this.cognitoService.signUp(this.user)
    .then(() => {
      this.loading = false;
      this.isConfirm = true;
    }).catch(error => {
      this.loading = false;
      if (error.code === 'UsernameExistsException') {
        this.errorMessage = 'This email address is already registered.';
        this.isVisible = true;
      } else if (error.code === 'InvalidParameterException' && error.message.includes('password')) {
        this.errorMessage = 'Password should have uppercase, lowercase, numeric, special characters and should be at least 8 characters long.';
        this.isVisible = true;
      } else if (error.code === 'InvalidParameterException' && error.message.includes('email')) {
        this.isVisible = true;
        this.errorMessage = 'Invalid email address.';
      } else if (error.code === 'UserLambdaValidationException') {
        this.isVisible = true;
        this.errorMessage = error.message;
      } else if (error.code === 'CodeDeliveryFailureException') {
        this.isVisible = true;
        this.errorMessage = 'There was a problem signing up. Please try again.';
      } else if (error.code === 'BadRequestException') {
        this.isVisible = true;
        this.errorMessage = 'There was a problem signing up. Please try again.';
      }
    });
  }

  public confirmSignUp(): void {
    this.loading = true;
    this.cognitoService.confirmSignUp(this.user)
    .then(() => {
      this.router.navigate(['/signIn']);
    }).catch(() => {
      this.loading = false;
    });
  }


  public update(): void {
    this.loading = true;

    this.cognitoService.updateUser(this.user)
    .then(() => {
      this.loading = false;
    }).catch(() => {
      this.loading = false;
    });
  }

}
