import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CrudService } from '../../services/crud.service';

export interface RoleData {
  data: {
    name: string;
    description: string;
  };
}

@Component({
  selector: 'app-new-role',
  templateUrl: './new-role.component.html',
  styleUrls: ['./new-role.component.scss'],
})
export class NewRoleComponent implements OnInit {
  createRoleForm: FormGroup;
  dataRole: RoleData;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._createRoleForm();
  }

  _createRoleForm = () => {
    this.createRoleForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  };

  registerRole(): void {
    this.dataRole = {
      data: {
        name: this.createRoleForm.get('name').value,
        description: this.createRoleForm.get('description').value,
      },
    };

    if (this.dataRole.data.name && this.dataRole.data.description) {
      const dataRole = {
        data: this.dataRole.data,
      };

      let savedRole = this.crudService.postData(dataRole, 'role');
      if (savedRole !== []) {
        this.router.navigate(['roles']);
      }
    } else {
      console.log('Fill al the gaps to continue please');
    }
  }
}
