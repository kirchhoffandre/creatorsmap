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
  location$: Observable<any>;

  lat;
  lng;
  

  constructor(public db: FirestoreService, private afs: AngularFirestore, public auth: AuthService) {
    console.log(this.auth.afAuth.auth.currentUser.uid);
    // User Id as a placeholder: UCg6KPJWKHY3T-B1IyAoZ01g
    this.user$ = this.db.doc$(`users/${this.auth.afAuth.auth.currentUser.uid}`);
    this.db.doc$(`location/${this.auth.afAuth.auth.currentUser.uid}`).subscribe(t => {
      console.log(t);
      this.lat = t.location.latitude;
      this.lng = t.location.longitude;
    });

  }

  

  ngOnInit() {
    // Old Method to use the DB
    // this.ref = this.afs.collection('items');
    // this.items = this.ref.valueChanges();
  }


  onMapClick(event) {
    console.log(event);
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }

  updateLocation() {
    const data = { location: this.db.geopoint(this.lat, this.lng)};
    this.db.upsert(`users/${this.auth.afAuth.auth.currentUser.uid}`, data);
  }

  private getUserLocation() {
    /// locate the user
      if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude);
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

      });
    }
  }
  
}
