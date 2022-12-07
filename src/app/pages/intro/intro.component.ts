import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  popupCookie = false

  constructor() { }
  getCookie(name:string) {
    var cookieArr = document.cookie.split(";");

    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if(name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
  }

  acceptCookies(){
    document.cookie = "cookie=true;";
    this.popupCookie = false
  }
  refuseCookies(){
    document.cookie = "cookie=false;";
    this.popupCookie = false
  }
  delCook(){
    document.cookie = "cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  }
  ngOnInit(): void {
    if(this.getCookie('cookie') === null){
      this.popupCookie = true
    }
    document.cookie = "intro=true;";
  }

}
