import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
})
export class EditCourseComponent implements OnInit {
  editCourseForm: FormGroup;
  courseData: any;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getCourseData();
    this._editCourseForm();
  }

  private _getCourseData() {
    this.courseData = JSON.parse(localStorage.getItem('courseData'));
  }

  _editCourseForm = () => {
    this.editCourseForm = this.formBuilder.group({
      title: [this.courseData.title, [Validators.required]],
      professor: [this.courseData.professor, [Validators.required]],
      description: [this.courseData.description, [Validators.required]],
      topic: [this.courseData.topic, [Validators.required]],
    });
  };

  update(): void {
    let updateData = {
      data: {
        title: this.editCourseForm.get('title').value,
        professor: this.editCourseForm.get('professor').value,
        description: this.editCourseForm.get('description').value,
        topic: this.editCourseForm.get('topic').value,
      },
    };

    let updatedCourse = this.crudService.patchData(
      updateData,
      'course',
      this.courseData._id
    );

    if (updatedCourse !== []) {
      this.router.navigate(['/courses']);
      localStorage.clear();
    }
  }
}
