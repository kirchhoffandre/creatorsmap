import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-homemap',
  templateUrl: './homemap.component.html',
  styleUrls: ['./homemap.component.css']
})
export class HomemapComponent implements OnInit {

  creatorList$: Observable<any>;

    // Zoom Level
    zoom = 4;
    // setting Default Locations
    lat = 51.678418;
    lng = 7.809007;

  constructor(public db: FirestoreService, public afs: AngularFirestore) {
    this.creatorList$ = this.db.col$('users');
  }

  ngOnInit() {
  }


  onMapClick(event) {
    console.log(event);
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }

}
