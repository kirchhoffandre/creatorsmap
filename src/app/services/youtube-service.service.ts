import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class YoutubeServiceService {

  channel$;

  constructor(private http: HttpClient) { }

  getChannel() {
    return this.http.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=UCxNHANKVvee819CSxb6UEtA` +
    '&key=AIzaSyDXnJg5Bsfw-OguBR18Lz0bhnaPcRJXwvo').pipe(map(
      model => {
        console.log(model);
        return model;
      }
    ));
  }

  getChannel2(channelId: String) {
    return this.http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}` + '&maxResults=10&order=date&type=video&key=AIzaSyDXnJg5Bsfw-OguBR18Lz0bhnaPcRJXwvo').pipe(map(
      model => {
        console.log(model);
        return model;
      }
    ));
  }

  getYoutube(channelId: String) {
    return this.http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&' +
    'channelId=${channelId}` +
    '&maxResults=10' +
    '&order=date&' +
    'key=AIzaSyDXnJg5Bsfw-OguBR18Lz0bhnaPcRJXwvo').pipe(map(
      model => {
      console.log('fuck');
        console.log(model);
      }
    ));
  }

}
