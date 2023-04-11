import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { count, first, switchMap, tap } from 'rxjs/operators';
import { CognitoService } from 'src/app/listings/services/cognito.service';
import { UsersQuery } from 'src/app/listings/store/users.query';
import { UsersStore } from 'src/app/listings/store/users.store';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  users$!: Observable<any>;
  numberOfUsers?: number;
  usersQuery: UsersQuery;
  usersStore: UsersStore;

  constructor(private cognitoService: CognitoService, usersQuery: UsersQuery, usersStore: UsersStore) {
    this.usersQuery = usersQuery;
    this.usersStore = usersStore;
  }

  async ngOnInit(){   
    this.users$ = this.cognitoService.getAllUsers().pipe(tap(users => this.usersStore.loadUsers(users, true)));
    this.users$.subscribe(users => this.numberOfUsers = users.length);
  }

  async deleteUser(a: any){
    await this.cognitoService.deleteUser(a);
    this.usersStore.remove(a.Username);
    this.users$ = this.cognitoService.getAllUsers().pipe(tap(users => this.usersStore.loadUsers(users, true)));
    this.users$.subscribe(users => this.numberOfUsers = users.length);
}

  

}
