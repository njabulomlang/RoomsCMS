import { Component, OnInit } from '@angular/core';
import { room } from '../model/room';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pic;
  room = {} as room;
  selectedFile = null;
  ref = firebase.database().ref('rooms/');
  storageRef = firebase.storage().ref();
  constructor(private router : Router, private http: HttpClient) { }

  ngOnInit() {
  }
  onFileSelect(event){
   // this.selectedFile = event.target.files[0];


   }

  upload() {
   /// this.http.post('',)
   // let storageRef = firebase.storage().ref();
    const filename = Math.floor(Date.now() / 1000);
    const imageRef = this.storageRef.child(`my-rooms/${filename}.jpg`);

    imageRef.putString(this.pic, firebase.storage.StringFormat.DATA_URL)
    .then((snapshot) => {
      console.log('image uploaded');
      this.room.pic = snapshot.downloadURL
      console.log(this.pic);

     // loaders.present();
    })
  }

  addRoom(room : room){
    this.upload()
      let newUser = this.ref.push();
    newUser.set({
      Room_name: room.name,
      Hotelname: room.hotelName,
      Feautures: room.feautures,
      Price: room.price,
      Description : room.description,
      Pic: this.room.pic
    });
     this.room.name = '';
     this.room.hotelName = '';
     this.room.feautures = '';
     this.room.description = '';
     this.room.price = null;

    this.router.navigateByUrl("/home");
    }

    
  }
