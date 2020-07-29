import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CrudService } from '../services/crud.service';
import { WebServiceService } from '../services/web-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  private url: string;
  userData = [];

  constructor(
    private crudService: CrudService,
    private server: WebServiceService,
    private http: HttpClient,
    private router: Router
  ) {
    this.url = this.server.getUrl();
  }

  ngOnInit(): void {
    this.getUsers();
  }

  // getUsers(): void {
  //   this.userData = this.crudService.getAllData('users');
  //   console.log(this.userData);
  // }

  getUsers(): void {
    this.http
      .get(`${this.url}users`, this.server.getHeaders())
      .subscribe((data: any) => {
        data.data.forEach((element) => {
          this.userData.push(element);
        });
      });
  }

  delete(_id) {
    this.crudService.deleteData('user', _id);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/users']);
    });
  }

  edit(userData): void {
    localStorage.setItem('userData', JSON.stringify(userData));
    this.router.navigate(['/users/edit']);
  }

  goCreateUser() {
    this.router.navigate(['/users/create']);
  }
}
