import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IUser } from './listings/services/cognito.service';
import { CognitoService } from './listings/services/cognito.service';
import { UserService } from './listings/services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'advertsProject';
  user?:IUser;


  constructor(private router: Router,
    private cognitoService: CognitoService,
    public userService:UserService) {

}
ngOnInit() {

}

public isAdmin():boolean {
return this.userService.isAdmin();
}


public isAuthenticated(): boolean {
return this.cognitoService.isAuthenticated();
}

public signOut(): void {
  this.cognitoService.signOut()
  .then(() => {
    this.router.navigate(['/home']);
  });
}

}
