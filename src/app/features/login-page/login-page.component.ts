import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from '../../core/services/service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  loginForm: FormGroup;
  PasswordShowHide: boolean = false;

  constructor(
    public serviceService: MainService,
    private fb: FormBuilder,
    private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.serviceService.LoginNewService({ Email_Id: username, Password: password }).subscribe((UserLoginInfo: any) => {
        UserLoginInfo = UserLoginInfo['Login'];
        if (UserLoginInfo['status'] == true) {
          const token = UserLoginInfo?.token
          localStorage.setItem("token", token);
          localStorage.setItem("UserData", JSON.stringify(UserLoginInfo))
          this.serviceService.USER_DATA.next(UserLoginInfo)
          this.router.navigate(['/home']);
          this.serviceService.commonService.loadCommonAPI();
        } else {
          this.serviceService.notifyService.showError('Email id & Password not matched...<br> Please Check again!', "Error Login")
        }
      }, (err: any) => {
        console.log(err, "Asdasdsadasdasdasd")
        this.serviceService.notifyService.showError(err?.error?.msg ?? JSON.stringify(this.loginForm.value), "Error Login")
      })
    } else {
      console.log('Form is invalid');
    }
  }
}
