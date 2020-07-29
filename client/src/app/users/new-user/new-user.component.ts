import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CrudService } from '../../services/crud.service';
import { FilesService } from '../../services/files.service.js';
import { DataRx } from 'src/app/models/data-rx';

export interface UserData {
  data: {
    name: string;
    lastname: string;
    age: number;
    email: string;
    password: string;
    profile_pic: string;
  };
}

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  createUserForm: FormGroup;
  dataUser: UserData;
  seeFile: any;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private filesService: FilesService
  ) {}

  ngOnInit(): void {
    this._createUserForm();
    this.seeFile = this.filesService.getFile('gallery', 'defaultPIC.png');
  }

  _createUserForm = () => {
    this.createUserForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      age: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      profile_pic: ['', [Validators.required]],
    });
  };

  registerUser(): void {
    this.dataUser = {
      data: {
        name: this.createUserForm.get('name').value,
        lastname: this.createUserForm.get('lastname').value,
        age: this.createUserForm.get('age').value,
        email: this.createUserForm.get('email').value,
        password: this.createUserForm.get('password').value,
        profile_pic: this.createUserForm.get('profile_pic').value,
      },
    };

    let confirmPassword = this.createUserForm.get('confirmPassword').value;

    if (this.dataUser.data.password === confirmPassword) {
      if (
        this.dataUser.data.name &&
        this.dataUser.data.lastname &&
        this.dataUser.data.email
      ) {
        const dataUser = {
          data: this.dataUser.data,
        };

        let savedUser = this.crudService.postData(dataUser, 'user');
        if (savedUser !== []) {
          this.router.navigate(['users']);
        }
      } else {
        console.log('Fill al the gaps to continue please');
      }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: "passwords don't match, try again",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }

  sendFile(event): void {
    let pic = this.createUserForm.get('profile_pic').value;

    if (pic !== 'defaultPIC.png') {
      this.filesService.deleteFile('gallery', pic);
    }

    const file = event.target.files;
    console.log(file);

    this.filesService.saveFile(file).subscribe((res: DataRx) => {
      // console.log(res);
      if (res.ok) {
        pic = res.data[0];
        this.seeFile = this.filesService.getFile('gallery', pic);
      }
    });
  }
}
