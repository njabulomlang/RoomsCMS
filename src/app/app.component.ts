import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { firebaseConfig } from './environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RoomsCMS';

  constructor(private router: Router){
  firebase.initializeApp(firebaseConfig);
  this.userLoggedIn();
  }
  userLoggedIn(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.router.navigateByUrl("/home");
      } else {
        this.router.navigateByUrl("/login");
      }
    })
  }
}
