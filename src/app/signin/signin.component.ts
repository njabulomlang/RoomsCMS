import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  email;
  password: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  Login(){
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
    .then( res =>{
      console.log(res);
      //this.navCtrl.push(HomePage);
      this.router.navigateByUrl("/home") ;

    })
  //  console.log(this.email);

  }


}
