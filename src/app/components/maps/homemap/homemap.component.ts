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
