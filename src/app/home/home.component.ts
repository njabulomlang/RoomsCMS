import { Component, OnInit } from '@angular/core';
import { room } from '../model/room';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { snapshotToArray } from '../environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pic : any;
  room = {} as room;
  rooms;
  users;
   //selectedFile = null;
  ref = firebase.database().ref('rooms/');
  storageRef = firebase.storage().ref();
  ref2 = firebase.database().ref('users/');

  constructor(private router : Router, private http: HttpClient) {
    this.featuredPhotoSelected

    this.ref.on('value', resp => {
      this.rooms = snapshotToArray(resp);
        console.log(resp.val());

      });
      this.ref2.on('value', resp => {
        this.users = snapshotToArray(resp);
          console.log(resp.val());

        })


   }

  ngOnInit() {
  }
  featuredPhotoSelected(event: any){
    const i = event.target.files[0];
   console.log(i);
   const upload = this.storageRef.child(i.name).put(i);
   upload.on('state_changed', snapshot => {
     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     console.log('upload is: ', progress , '% done.');
   }, err => {
   }, () => {
     upload.snapshot.ref.getDownloadURL().then(dwnURL => {
       console.log('File avail at: ', dwnURL);
       this.room.pic = dwnURL;
     });
   });
   }

 /* upload() {
   /// this.http.post('',)
    let storageRef = firebase.storage().ref();
    const filename = Math.floor(Date.now() / 1000);
    const imageRef = storageRef.child(`my-rooms/${filename}.jpg`);

    imageRef.putString(this.pic, firebase.storage.StringFormat.DATA_URL)
    .then((snapshot) => {
      console.log('image uploaded');
      this.room.pic = snapshot.downloadURL
      console.log(this.pic);

     // loaders.present();
    })
  }*/

  addRoom(room : room){
  //  this.upload()
  //this.featuredPhotoSelected();
      let newUser = this.ref.push();
    newUser.set({
      Room_name: room.name,
      Hotelname: room.hotelName,
      Feautures: room.feautures,
      Price: room.price,
      Description : room.description,
      Pic: room.pic
    });
     this.room.name = '';
     this.room.hotelName = '';
     this.room.feautures = '';
     this.room.description = '';
     this.room.price = null;
     this.room.pic = null;
    this.router.navigateByUrl("/home");
    }
  }
