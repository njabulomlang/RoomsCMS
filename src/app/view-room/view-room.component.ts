import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { snapshotToArray } from '../environment';
import { room } from '../model/room';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrls: ['./view-room.component.css']
})
export class ViewRoomComponent implements OnInit {

  key;
  ref = firebase.database().ref('rooms/');
  refBook = firebase.database().ref();
  rooms : any;
  rName;
 booking: any;
 count: any;
 room = {} as room;
  constructor(private router: ActivatedRoute, private rout: Router) {
    this.router.paramMap.subscribe((param) => {
      this.key = param.get('key');

 })
 this.ref.orderByKey().equalTo(this.key).on('value', resp => {
   this.rooms = snapshotToArray(resp);
   resp.forEach(element => {
      this.rName = element.val().Room_name;
   });

   })

   this.refBook.child('bookings').orderByChild('Room').equalTo(this.rName).on('value', (resp1) => {
    this.count = resp1.val();
    console.log(this.count);
    if(resp1.exists()) {
       this.booking = snapshotToArray(resp1);
       console.log(this.booking);

    }else {
      console.log("Error!");

    }
   })

  // this.refBook.child('bookings').orderByChild('')
   }
   editRoom(room:room){
    let newUser = {
      Room_name: room.name,
      Hotelname: room.hotelName,
      Feautures: room.feautures,
      Price: room.price,
      Description : room.description,
      Pic: room.pic
    };
    // Get a key for a new Post.
    var newPostKey = this.ref.push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
      return this.ref.update(newUser + newPostKey);
   }


  ngOnInit() {
  }

}
