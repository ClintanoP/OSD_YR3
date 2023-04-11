import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { CognitoService } from '../listings/services/cognito.service';
import { UserService } from '../listings/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private appComponent: AppComponent){
  }

  canActivate(): boolean{
    if (this.appComponent.isAdmin()){
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
