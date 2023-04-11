import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Amplify } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { environment} from 'src/environments/environment';
import * as AWS from 'aws-sdk';
import { userInfo } from 'os';
import { threadId } from 'worker_threads';

import { UserService } from './user.service';
import { env } from 'process';

export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
  myusertype:string;
  phoneNum:string;
  "custom:phoneNumber":string;
  "custom:usertype":string;
  Attributes: {}
}

@Injectable({
  providedIn: 'root'
})

export class CognitoService {

  private authenticationSubject: BehaviorSubject<any>;

  userPoolId = environment.cognito.userPoolId;
  awsRegion = 'eu-west-1';
  cognitoIdentityPoolId = '';

  


  constructor(private userService:UserService) {
    Amplify.configure({
      Auth: environment.cognito,
    });
    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }



  public signUp(user: IUser): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
      attributes: {
        'custom:usertype': 'user'
      }
    });
  }

  public confirmSignUp(user: IUser): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  public signIn(user: IUser): Promise<any> {
    this.getUser();
    return Auth.signIn(user.email, user.password)
    .then(() => {
      this.authenticationSubject.next(true);
      this.getUser()
      .then((user: any) => {
        // this is a custom attribute you setup on creating the user pool
        // if it contains the word admin - then this admin user has access
        // to profile, create entry and update/delete
        let usertype = user.attributes["custom:usertype"];
        console.log(usertype);
        console.log(user.attributes["custom:phoneNumber"]);
        this.userService.UserPhoneNumber=user.attributes["custom:phoneNumber"];
        if (usertype=="admin")
        this.userService.UserType="admin";
        else
        this.userService.UserType="user";
      });
    });
  }

  public signOut(): Promise<any> {
    return Auth.signOut()
    .then(() => {
      this.authenticationSubject.next(false);
      this.userService.UserType="";
      this.userService.UserPhoneNumber="";
    });
  }

  public isAuthenticated(): boolean {
    return this.authenticationSubject.value;
  }


  public getUser(): Promise<any> {
    return Auth.currentUserInfo()

  }

  public getMyUser():void {
    Auth.currentAuthenticatedUser()
    .then((currentUser) => {
      console.log('The currentUser => ', currentUser);
    
      Auth.currentUserInfo()
        .then((res) => {
          console.log('Here are the current user info! =>', res);
        })
        .catch((err) => {
          console.log('Current user info failed to fetch', err);
        });
     
    })
    .catch((err) => {
      console.log("my error" + err);
    });
  } 
  

  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser()
    .then((cognitoUser: any) => {
      return Auth.updateUserAttributes(cognitoUser, user);
    });
  }

  public getCognitoIdentityPoolId(): void{
    Auth.currentAuthenticatedUser()
    .then((currentUser) => {
      Auth.currentCredentials()
      .then((res) => {
        this.cognitoIdentityPoolId = res.identityId;
      })
      .catch((err) => {
        console.log('Current user credentials failed to fetch', err);
      });
    })
  }

  public async deleteUser(username: string): Promise<void> {
    try {
      const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({
        region: environment.cognito.userPoolRegion,
        params: { UserPoolId: environment.cognito.userPoolId }
      });
      
      const deleteUserParams = {
        UserPoolId: environment.cognito.userPoolId,
        Username: username
      };
      
      await cognitoIdentityServiceProvider.adminDeleteUser(deleteUserParams).promise();
      console.log(`User ${username} deleted successfully`);
    } catch (error) {
      console.error(`Failed to delete user ${username}: ${error}`);
    }
  }
  

  getAllUsers(): Observable<any> {
    return new Observable(observer => {
      AWS.config.region = 'eu-west-1'; // Region
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'eu-west-1:7722b641-9f63-45be-a092-8080c9c54fb1',
      });
      
      Amplify.configure({
        Auth:{
          identityPoolId: environment.cognito.identityPoolId,
          region: environment.cognito.userPoolRegion,
          userPoolId: environment.cognito.userPoolId,
          userPoolWebClientId: environment.cognito.userPoolWebClientId
        }
      });

      const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider(
        {
          region: environment.cognito.userPoolRegion,
          params:{UserPoolId: environment.cognito.userPoolId}
        }
      )

      const getUsers = async () => {
        try {
          const response = await cognitoidentityserviceprovider.listUsers().promise();
          observer.next(response.Users);
          console.log(response.Users);
          observer.complete();
        } catch (error) {
          observer.error(error);
        }
      };

      Auth.currentAuthenticatedUser()
      .then(() => {
        getUsers();
      })
      .catch((error) => {
        console.log(error);
        // If the user is not authenticated, set the identity ID to the unauthenticated identity ID
        getUsers();
      });
    });
  }

 

}
