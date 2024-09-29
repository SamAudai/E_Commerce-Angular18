import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { User } from '../../core/models/object_model';
import { RouterModule, Router } from '@angular/router';
import { LoginSignupService } from '../../shared/services/login-signup.service';

@Component({
  selector: 'app-signin-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './signin-signup.component.html',
  styleUrl: './signin-signup.component.css'
})
export class SigninSignupComponent implements OnInit {

  regForm: Boolean = false;
  signUpform!: FormGroup;
  signInform!: FormGroup;
  signUpsubmitted = false;
  href: String = '';
  user_data: any;
  user_dto!: User;
  user_reg_data: any;

  signInFormValue: any = {};

  constructor(private formBuilder: FormBuilder, 
    private router: Router, 
    private logsign_service: LoginSignupService) { }

  ngOnInit(): void {
    this.href = this.router.url;
    if (this.href == '/sign-up') {
      this.regForm = true;
    } else if (this.href == '/sign-in') {
      this.regForm = false;
    }

    this.signUpform = this.formBuilder.group({
      name: [null, Validators.required],
      mobNumber: [null, Validators.required],
      age: [null, Validators.required],
      dob: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      addLine1: [null, Validators.required],
      addLine2: [null],
      city: [null, Validators.required],
      state: [null, Validators.required],
      zipCode: [null, Validators.required],
      language: [null, Validators.required],
      gender: [null, Validators.required],
      aboutYou: [null, Validators.required],
      uploadPhoto: [null, Validators.required],
      agreetc: [null, Validators.required],
      role: [null, Validators.required],

    })
    this.signInform = this.formBuilder.group({
      //email: [null, [Validators.required, Validators.email]],
      //password: [null, [Validators.required, Validators.minLength(6)]]
    })
  }
  get rf() { return this.signUpform.controls; }
  //get tf() { return this.signInform.controls; }

  onSubmitSignUp() {
    this.signUpsubmitted = true;
    if (this.signUpform.invalid) {
      // alert('Error!! :-)\n\n' + JSON.stringify(this.signUpform.value))
      return;
    }
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signUpform.value))
    // console.log(this.signUpform.value)
    this.user_reg_data = this.signUpform.value;
    this.user_dto = {
      aboutYou: this.user_reg_data.aboutYou,
      // addLine1: this.user_reg_data.addLine1,
      // addLine2: this.user_reg_data.addLine2,
      age: this.user_reg_data.age,
      agreetc: this.user_reg_data.agreetc,
      // city: this.user_reg_data.city,
      dob: this.user_reg_data.dob,
      email: this.user_reg_data.email,
      gender: this.user_reg_data.gender,
      address: {
        id: 0,
        addLine1: this.user_reg_data.addLine1,
        addLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipCode: this.user_reg_data.zipCode,
      },
      language: this.user_reg_data.language,
      mobNumber: this.user_reg_data.mobNumber,
      name: this.user_reg_data.name,
      password: this.user_reg_data.password,
      // state: this.user_reg_data.state,
      uploadPhoto: this.user_reg_data.uploadPhoto,
      // zipCode: this.user_reg_data.zipCode,
      role: this.user_reg_data.role
    }
    this.logsign_service.userRegister(this.user_dto).subscribe(() => {
      // console.log(data);
      alert("Success");
      this.router.navigateByUrl('/sign-in');
    }, () => {
      alert("Some Error Occured");
    })
  }

  onSubmitSignIn() {
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signInFormValue));
    this.logsign_service.authLogin(this.signInFormValue.userEmail, this.signInFormValue.userPassword)
                         .subscribe((res) => {
      this.user_data = res;
      if (this.user_data.length == 1) {
        // alert("Validate")
        if (this.user_data[0].role === "seller") {
          sessionStorage.setItem("user_session_id", this.user_data[0].id);
          sessionStorage.setItem("role", this.user_data[0].role);
          this.router.navigateByUrl('/seller-dashboard');
        } else if (this.user_data[0].role === "buyer") {
          sessionStorage.setItem("user_session_id", this.user_data[0].id);
          sessionStorage.setItem("role", this.user_data[0].role);
          this.router.navigateByUrl('/buyer-dashboard');
        } else {
          alert("Invalid-user-role")
        }
      } else {
        alert("Invalid")
      }
      console.log(this.user_data);

    }, error => {
      console.log("My error", error);
    })
  }
  
}