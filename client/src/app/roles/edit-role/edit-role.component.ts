import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CrudService } from '../../services/crud.service';

// export interface RoleData {
//   data: {
//     name: string;
//     description: string;
//   };
// }

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss'],
})
export class EditRoleComponent implements OnInit {
  editRoleForm: FormGroup;
  dataRole: any;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getRoleData();
    this._editUserForm();
  }

  private _getRoleData() {
    this.dataRole = JSON.parse(localStorage.getItem('roleData'));
  }

  _editUserForm(): void {
    this.editRoleForm = this.formBuilder.group({
      name: [this.dataRole.name, [Validators.required]],
      description: [this.dataRole.description, [Validators.required]],
    });
  }

  update(): void {
    let updateRole = {
      data: {
        name: this.editRoleForm.get('name').value,
        description: this.editRoleForm.get('description').value,
      },
    };
    let updatedRole = this.crudService.patchData(
      updateRole,
      'role',
      this.dataRole._id
    );

    if (updatedRole !== []) {
      this.router.navigate(['/roles']);
      localStorage.clear();
    }
  }
}
