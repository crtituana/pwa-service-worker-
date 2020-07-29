import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CrudService } from '../services/crud.service';
import { WebServiceService } from '../services/web-service.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  private url: string;
  courseData = [];

  constructor(
    private crudService: CrudService,
    private server: WebServiceService,
    private http: HttpClient,
    private router: Router
  ) {
    this.url = this.server.getUrl();
  }

  ngOnInit(): void {
    this.getCourses();
  }


  getCourses(): void {
    this.http
      .get(`${this.url}courses`, this.server.getHeaders())
      .subscribe((data: any) => {
        data.data.forEach((element) => {
          this.courseData.push(element);
        });
      });
  }

  delete(_id) {
    this.crudService.deleteData('course', _id);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/courses']);
    });
  }

  edit(courseData): void {
    localStorage.setItem('courseData', JSON.stringify(courseData));
    this.router.navigate(['/courses/edit']);
  }

  goCreateCourse() {
    this.router.navigate(['/courses/create']);
  }
}
