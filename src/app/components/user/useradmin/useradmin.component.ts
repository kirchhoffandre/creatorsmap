import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection} from '@angular/fire/firestore';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';



interface Location {
  latitude: number;
  longitude: number;
}


@Component({
  selector: 'app-useradmin',
  templateUrl: './useradmin.component.html',
  styleUrls: ['./useradmin.component.css']
})
export class UseradminComponent implements OnInit {

  ref: AngularFirestoreCollection<any>;
  user$: Observable<any>;
  userLocation$: Observable<any>;

  lat = 52.3;
  lng = 12.4;

  location: any;

  draggable: true;

  public mapStyle = [
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#e9e9e9"
          },
          {
              "lightness": 17
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#f5f5f5"
          },
          {
              "lightness": 20
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#ffffff"
          },
          {
              "lightness": 17
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#ffffff"
          },
          {
              "lightness": 29
          },
          {
              "weight": 0.2
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#ffffff"
          },
          {
              "lightness": 18
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#ffffff"
          },
          {
              "lightness": 16
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#f5f5f5"
          },
          {
              "lightness": 21
          }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#dedede"
          },
          {
              "lightness": 21
          }
      ]
  },
  {
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#ffffff"
          },
          {
              "lightness": 16
          }
      ]
  },
  {
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "saturation": 36
          },
          {
              "color": "#333333"
          },
          {
              "lightness": 40
          }
      ]
  },
  {
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#f2f2f2"
          },
          {
              "lightness": 19
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#fefefe"
          },
          {
              "lightness": 20
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#fefefe"
          },
          {
              "lightness": 17
          },
          {
              "weight": 1.2
          }
      ]
  }
  ];


  constructor(public db: FirestoreService, private afs: AngularFirestore, public auth: AuthService, private router: Router) {
    //console.log(this.auth.afAuth.auth.currentUser.uid);
    // User Id as a placeholder: UCg6KPJWKHY3T-B1IyAoZ01g
    
    this.auth.user$.subscribe(res => {
        if (res) {
            this.user$ = this.db.doc$(`users/${this.auth.afAuth.auth.currentUser.uid}`);
            this.userLocation$ = this.db.doc$(`location/${this.auth.afAuth.auth.currentUser.uid}`);
            
            this.userLocation$.subscribe(rest => {
                console.log(rest);
                    if (rest.location.latitude === '') {
                        this.lat = 52.3;
                        this.lng = 12.4;
                    } else {
                        this.lat = rest.location.latitude;
                        this.lng = rest.location.longitude;
                    }
            });
        } else {
            return this.router.navigate(['/']);
        }
    });
    
    this.getUserLocation();

   

  }


  ngOnInit() {
    // Old Method to use the DB
    // this.ref = this.afs.collection('items');
    // this.items = this.ref.valueChanges();
 
  }


  onMapClick($event) {
    console.log($event);
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }

  updateLocation() {
    const data = { location: this.db.geopoint(this.lat, this.lng), locationSet: true};
    this.db.upsert(`users/${this.auth.afAuth.auth.currentUser.uid}`, data);
  }

  markerDragEnd($event:any){
    console.log($event);
  }

  public getUserLocation() {
    /// locate the user
    console.log('test');
      console.log(window);
      console.log(navigator);

      if(!navigator.geolocation){
        console.log("this is my error");
      } else {


        navigator.geolocation.getCurrentPosition((position) => {
          console.log("test inside the callback");
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.updateLocation();
        });

      }
  }
  
}
