import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILogin } from 'src/app/pages/authentication/models/login.model';
import { AuthenticationService } from 'src/app/pages/authentication/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  loginFrom:FormGroup;
  loginDto:ILogin={
    username:'admin@test.com',
    password:'P@ssw0rd',
    rememberMe:false
  }
  constructor(private authService:AuthenticationService) {
    this.loginFrom = new FormGroup({
      username: new FormControl(this.loginDto.username,Validators.required),
      password: new FormControl(this.loginDto.password,Validators.required),
      rememberMe:new FormControl(this.loginDto.rememberMe),
    })
  }

  onSubmit(){
    this.authService.login(this.loginFrom.value).subscribe(res=>{
      if(res.succeeded){
        this.authService.setLoginData(res.data);
      }
    },err=>{
      console.log(err);
    });
  }
}
