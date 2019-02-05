import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection} from '@angular/fire/firestore';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-useradmin',
  templateUrl: './useradmin.component.html',
  styleUrls: ['./useradmin.component.css']
})
export class UseradminComponent implements OnInit {

  ref: AngularFirestoreCollection<any>;
  user$: Observable<any>;

  lat: any;
  lng: any;
  

  constructor(public db: FirestoreService, private afs: AngularFirestore, public auth: AuthService) {
    console.log(this.auth.afAuth.auth.currentUser.uid);
    // User Id as a placeholder: UCg6KPJWKHY3T-B1IyAoZ01g
    this.user$ = this.db.doc$(`users/${this.auth.afAuth.auth.currentUser.uid}`);
  }

  

  ngOnInit() {
    // Old Method to use the DB
    // this.ref = this.afs.collection('items');
    // this.items = this.ref.valueChanges();
   
  }


  updateLocation() {
    const data = { location: this.db.geopoint(12, 12)};
    this.db.upsert(`location/${this.auth.afAuth.auth.currentUser.uid}`, data);
  }
  
}
