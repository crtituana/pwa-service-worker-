import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CrudService } from '../../services/crud.service';

export interface CourseData {
  data: {
    title: string;
    professor: string;
    description: number;
    topic: string;
  };
}

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss'],
})
export class NewCourseComponent implements OnInit {
  createCourseForm: FormGroup;
  dataCourse: CourseData;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._createCourseForm();
  }

  _createCourseForm = () => {
    this.createCourseForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      professor: ['', [Validators.required]],
      description: ['', [Validators.required]],
      topic: ['', [Validators.required]],
    });
  };

  registerCourse(): void {
    this.dataCourse = {
      data: {
        title: this.createCourseForm.get('title').value,
        professor: this.createCourseForm.get('professor').value,
        description: this.createCourseForm.get('description').value,
        topic: this.createCourseForm.get('topic').value,
      },
    };

    let savedCourse = this.crudService.postData(this.dataCourse, 'course');
    if (savedCourse !== []) {
      this.router.navigate(['/courses']);
    }
  }
}
