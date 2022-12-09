import {Component, Input, OnInit} from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import {UserUpdate} from "../../model/user.model";
import {Router} from "@angular/router";


@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css'],
})
export class CompteComponent implements OnInit {
  id?: number;
  user?: any;
  title: string = 'compte';
  isLogged: boolean = !!this.tokenStorage.getToken();
  form: any = {
    password: null,
    confirmpassword : null,
    nickname : null,
    lname : null,
    fname : null,
    phone : null,
    adress : null,
  };

  @Input()
  UserUpdateData!: UserUpdate;


  constructor(private tokenStorage: TokenStorageService, private userService: UserService) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.id = this.tokenStorage.getUser().userId;

    }
    if (this.id != undefined) {
      this.userService.getUserById(this.id).subscribe({
        next: data => {
          this.user = data;
        },
        error: err => {
          console.log(err)
          if (err.error) {
            console.error(JSON.parse(err.error).message);
          } else {
            console.error("Error with status: " + err.status);
          }
        }
      });
    }
  }

  onSubmit(){
    console.table(this.form);
    const { password, confirmpassword, nickname, lname, fname, phone, adress} = this.form;
    const userUpdate: UserUpdate = {};
    if(password != confirmpassword){ 
      password !== null ? userUpdate.password = password : null;
    }
      nickname !== null ? userUpdate.nickname = nickname : null;
      lname !== null ? userUpdate.lname = lname : null;
      fname !== null ? userUpdate.fname = fname : null;
      phone !== null ? userUpdate.phone = phone : null;
      adress !== null ? userUpdate.adress = adress : null;
    
     
    this.userService.updateUserPersonalInfo(this.id!, userUpdate).subscribe({
      next: data => {
        alert("Vos informations ont été mises à jour");
        window.location.reload();
      },
      error: err => {
        console.log(err)
        if (err.error) {
          console.error(JSON.parse(err.error).message);
        } else {
          console.error("Error with status: " + err.status);
        }
      }
    });
  };
  

}
