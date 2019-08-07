import { Component, OnInit } from '@angular/core';
import { room } from '../model/room';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { snapshotToArray } from '../environment';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  pic : any;
  room = {} as room;
  rooms;
  users;
   //selectedFile = null;
  ref = firebase.database().ref('rooms/');
  storageRef = firebase.storage().ref();

  constructor(private router : Router, private http: HttpClient) {


    this.ref.on('value', resp => {
      this.rooms = snapshotToArray(resp);
        console.log(resp.val());

      });

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

  addRoom(room : room){
     //this.upload()
    //this.featuredPhotoSelected(event);
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
