import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { snapshotToArray } from '../environment';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrls: ['./view-room.component.css']
})
export class ViewRoomComponent implements OnInit {

  key;
  ref = firebase.database().ref('rooms/');
  rooms : any;
  
  constructor(private router: ActivatedRoute, private rout: Router) {
    this.router.paramMap.subscribe((param) => {
      this.key = param.get('key');

 })
 this.ref.orderByKey().equalTo(this.key).on('value', resp => {
   this.rooms = snapshotToArray(resp);
     console.log(this.rooms);
   })
   }

  ngOnInit() {
  }

}
