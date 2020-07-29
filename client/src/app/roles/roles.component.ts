import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CrudService } from '../services/crud.service';
import { WebServiceService } from '../services/web-service.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  private url: string;
  rolesData = [];

  constructor(
    private crudService: CrudService,
    private server: WebServiceService,
    private http: HttpClient,
    private router: Router
  ) {
    this.url = this.server.getUrl();
  }

  ngOnInit(): void {
    this.getRoles();
  }

  // getRoles(): void {
  //   this.rolesData = this.crudService.getAllData('roles');
  //   console.log(this.rolesData);
  // }

  getRoles(): void {
    this.http
      .get(`${this.url}roles`, this.server.getHeaders())
      .subscribe((data: any) => {
        data.data.forEach((element) => {
          this.rolesData.push(element);
        });
      });
  }

  delete(_id) {
    this.crudService.deleteData('role', _id);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/roles']);
    });
  }

  edit(rolesData): void {
    localStorage.setItem('roleData', JSON.stringify(rolesData));
    this.router.navigate(['/roles/edit']);
  }

  goCreateRole(): void {
    this.router.navigate(['/roles/create']);
  }
}
