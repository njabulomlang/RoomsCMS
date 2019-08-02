import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email;
  password;
  constructor(private router: Router) { }

  ngOnInit() {
  }


  Register(){
   console.log(this.email);

  }

}
