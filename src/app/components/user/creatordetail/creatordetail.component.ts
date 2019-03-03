import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FirestoreService } from 'src/app/services/firestore.service';
import { YoutubeServiceService } from 'src/app/services/youtube-service.service';
import { Video } from 'src/app/models/video.model';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-creatordetail',
  templateUrl: './creatordetail.component.html',
  styleUrls: ['./creatordetail.component.css']
})
export class CreatordetailComponent implements OnInit {
  creator$;
  channel$;
  creatorId;
  videoList: Video[] = [];
  lat: any;
  lng: any;

  // Form Fields
  showMForm = false;

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




  constructor(public auth: AuthService, public db: FirestoreService, private route: ActivatedRoute, private youtubeService: YoutubeServiceService) { 

  }

  ngOnInit() {

    this.creator$ = this.route.paramMap.pipe(
      switchMap(params => {
        console.log('hello router');
        const id = params.get('id');
        console.log(id);
        this.creator$ = this.db.doc$('users/' + id).subscribe(data => {
          // Get Channnel ID of Creator
          this.creatorId = data['id'];

          // Get Location of Creator
          this.lat = data['location'].latitude;
          this.lng = data['location'].longitude;

          console.log(this.lat);
          // Retrieve Videos & Details of Creator
          this.youtubeService.getChannel2(this.creatorId).subscribe(data2 => {
            console.log(data2);
            this.videoList = data2['items'].map(item => {
              return new Video(
                item.id.videoId,
                item.snippet.title,
                item.snippet.thumbnails.high.url,
                item.snippet.channelTitle,
                item.snippet.channelId,
                item.snippet.description);
            });
          });

        });
        return this.creator$ = this.db.doc$('users/' + id);
      })

    );
  }


  openMessagingForm() {
    this.showMForm = !this.showMForm;
  }

}
