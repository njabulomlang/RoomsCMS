import { Upload } from './upload';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  ref = firebase.database().ref("rooms/");
  storageRef = firebase.storage().ref();

  constructor() { }

  pushUpload(upload: Upload) {
    
  }
}
