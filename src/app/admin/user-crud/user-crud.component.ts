import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../core/models/object_model';
import { AdminService } from '../services/admin.service';
declare var jQuery: any;

@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css'
})
export class UserCrudComponent implements OnInit {

  all_user_data: any;
  single_user_data: any;
  addEditUserForm!: FormGroup;
  user_dto!: User;
  user_reg_data: any;
  edit_user_id: any;
  upload_file_name!: string;

  addEditUser = false;//for form validation

  add_user: Boolean = false;
  edit_user: Boolean = false;
  popup_header!: string;

  signInFormValue: any = {};

  constructor(private formBuilder: FormBuilder, private router: Router, private admin_service: AdminService) { }

  ngOnInit() {
    this.getAllUser();
    this.addEditUserForm = this.formBuilder.group({
      name: [null, Validators.required],
      mobNumber: [null, Validators.required],
      age: [null, Validators.required],
      dob: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      addLine1: [null, Validators.required],
      addLine2: [],
      city: [null, Validators.required],
      state: [null, Validators.required],
      zipCode: [null, Validators.required],
      language: [null, Validators.required],
      gender: [null, Validators.required],
      aboutYou: [null, Validators.required],
      uploadPhoto: [],
      agreetc: [null, Validators.required],
      role: [null, Validators.required]
    })
  }

  getAllUser() {
    this.admin_service.allUser().subscribe(data => {
      this.all_user_data = data;
      // console.log("getAllUser",this.all_user_data);
    }, error => {
      console.log("My error", error);
    })
  }
  get rf() { return this.addEditUserForm.controls; }

  //popup when add
  addUserPopup() {
    this.edit_user = false;
    this.add_user = true;
    this.popup_header = "Add New User";
    this.addEditUserForm.reset();
  }

  addUser() {
    this.addEditUser = true;
    if (this.addEditUserForm.invalid) {
      alert('Error!! :-)\n\n' + JSON.stringify(this.addEditUserForm.value))
      return;
    }
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.addEditUserForm.value))
    // console.log(this.addEditUserForm.value)
    this.user_reg_data = this.addEditUserForm.value;
    this.user_dto = {
      name: this.user_reg_data.name,
      mobNumber: this.user_reg_data.mobNumber,
      age: this.user_reg_data.age,
      dob: this.user_reg_data.dob,
      email: this.user_reg_data.email,
      password: this.user_reg_data.password,
      language: this.user_reg_data.language,
      gender: this.user_reg_data.gender,
      address: {
        id: 0,
        addLine1: this.user_reg_data.addLine1,
        addLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipCode: this.user_reg_data.zipCode,
      },
      aboutYou: this.user_reg_data.aboutYou,
      uploadPhoto: this.user_reg_data.uploadPhoto,
      agreetc: this.user_reg_data.agreetc,
      role: this.user_reg_data.role
    }
    this.admin_service.addUser(this.user_dto).subscribe(data => {
      this.getAllUser();
      jQuery('#addEditUserModal').modal('toggle');
    }, err => {
      alert("Some Error Occured");
    })
  }

  // popup when edit
  editUserPopup(user_id: any) {
    this.edit_user_id = user_id;
    this.edit_user = true;
    this.add_user = false;
    this.popup_header = "Edit User";
    this.admin_service.singleUser(user_id).subscribe(data => {
      this.single_user_data = data;
      this.upload_file_name = this.single_user_data.uploadPhoto;
      // console.log("editUserPopup:::", this.single_user_data);
      this.addEditUserForm.setValue({
        name: this.single_user_data.name,
        mobNumber: this.single_user_data.mobNumber,
        age: this.single_user_data.age,
        dob: this.single_user_data.dob,
        email: this.single_user_data.email,
        password: this.single_user_data.password,
        language: this.single_user_data.language,
        gender: this.single_user_data.gender,
        addLine1: this.single_user_data.address.addLine1,
        addLine2: this.single_user_data.address.addLine2,
        city: this.single_user_data.address.city,
        state: this.single_user_data.address.state,
        zipCode: this.single_user_data.address.zipCode,
        aboutYou: this.single_user_data.aboutYou,
        uploadPhoto: '',
        agreetc: this.single_user_data.agreetc,
        role: this.single_user_data.role,
      })
      // console.log("Individual User", this.single_user_data);
    }, error => {
      console.log("My error", error);
    })
  }

  updateUser() {
    if (this.addEditUserForm.invalid) {
      // alert('Error!! :-)\n\n' + JSON.stringify(this.addEditUserForm.value))
      return;
    }
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.addEditUserForm.value))
    // console.log(this.addEditUserForm.value)
    this.user_reg_data = this.addEditUserForm.value;
    this.user_dto = {
      name: this.user_reg_data.name,
      mobNumber: this.user_reg_data.mobNumber,
      age: this.user_reg_data.age,
      dob: this.user_reg_data.dob,
      email: this.user_reg_data.email,
      password: this.user_reg_data.password,
      language: this.user_reg_data.language,
      gender: this.user_reg_data.gender,
      address: {
        id: 0,
        addLine1: this.user_reg_data.addLine1,
        addLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipCode: this.user_reg_data.zipCode,
      },
      aboutYou: this.user_reg_data.aboutYou,
      uploadPhoto: (this.user_reg_data.uploadPhoto == "" ? this.upload_file_name : this.user_reg_data.uploadPhoto),
      agreetc: this.user_reg_data.agreetc,
      role: this.user_reg_data.role
    }
    this.admin_service.editUser(this.edit_user_id, this.user_dto).subscribe(data => {
      this.getAllUser();
      jQuery('#addEditUserModal').modal('toggle');
    }, err => {
      alert("Some Error Occured");
    })
  }

  deleteUser(user_id: any) {
    this.admin_service.deleteUser(user_id).subscribe(data => {
      this.getAllUser();
    }, err => {
      alert("Some Error Occured");
    })
  }

}
