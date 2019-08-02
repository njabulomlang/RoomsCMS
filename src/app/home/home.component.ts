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
  selectedFile = null;
  ref = firebase.database().ref('rooms/');
  storageRef = firebase.storage().ref();

  constructor(private router : Router, private http: HttpClient) {
    this.featuredPhotoSelected

    this.ref.on('value', resp => {
      this.rooms = snapshotToArray(resp);
        console.log();

      })
   }

  ngOnInit() {
  }
  featuredPhotoSelected(event: any){
    const file: File = event.target.files[0];
    console.log("Selected filename: ", file.name);

    const metaData = {'contentType' : file.type};
  // file = Math.floor(Date.now() / 1000);
    const ImageRef = this.storageRef.child(`my-rooms/${file}.jpg`);
    ImageRef.put(file, metaData);
    this.room.pic = ImageRef.getDownloadURL();
    console.log(this.room.pic);

    console.log("Uploading: ", file.name);
   // console.log(this.pic.name);
    //this.pic = file.name;
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
      Pic: room.pic.name
    });
     this.room.name = '';
     this.room.hotelName = '';
     this.room.feautures = '';
     this.room.description = '';
     this.room.price = null;

    this.router.navigateByUrl("/home");
    }
  }
