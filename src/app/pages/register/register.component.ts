import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import {ActivatedRoute, Router} from "@angular/router";
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
    confirmpassword : null,
    lname : null,
    fname : null,
    phone : null,
    adress : null,
    nickname : null,
    terms : null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  title:string = 'Inscription';


  constructor(private authService: AuthService, private router:Router, private tokenService: TokenStorageService) {

  }
  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.router.navigateByUrl('/index');
    }
  }


  onSubmit(): void {
    const {email,
      password,
      confirmpassword,
      lname,
      fname,
      phone,
      adress,
      nickname,
      terms } = this.form;

      console.table(this.form);
      if(terms !== true){
        this.errorMessage = "Vous devez accepter les conditions d'utilisation";
        this.isSignUpFailed = true;
      }
      if(password != confirmpassword){
        this.errorMessage = "Les mots de passe doivent être identiques !";
        this.isSignUpFailed = true;
      }else{
        this.authService.register(this.form).subscribe({
          next: data => {
           
            this.isSuccessful = true;
            this.isSignUpFailed = false;

            this.router.navigateByUrl('/login')
          },
          error: err => {
            this.errorMessage = err.error.message;
            this.isSignUpFailed = true;
          }
        });
      }
  }
}
