import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public loginForm !: FormGroup;
  public message:string = '';

  constructor(private formBuilder:FormBuilder, private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email,Validators.maxLength(255)]],
      password: ['',[Validators.required,Validators.minLength(6)]]
    });
  }

  login(){
    let val = this.loginForm.value;

    if(val.email && val.password){
      this.authService.login(val)
      .subscribe({
        next:(res) => {
          localStorage.setItem('token', res.access_token);
          this.router.navigate(['/home']);
        },error:(err)=>{
          this.message = "Invalid email or password";
        }
      })
    }else{
      this.message = "Please provide email and password";
    }
  }

}
