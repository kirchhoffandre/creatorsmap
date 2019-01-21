import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

declare var gapi: any;



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  user$: Observable<firebase.User>;
  channelID: string;
  youtubeItems: any[];

  constructor(public afAuth: AngularFireAuth) {
    this.initClient();
    this.user$ = afAuth.authState;
  }



  initClient() {
    gapi.load('client', () => {
      console.log('loaded client');

      // It's OK to expose these credentials, they are client safe.
        gapi.client.init({
        // Firebase API Key
        apiKey: 'AIzaSyC-tSTFBXxz5DxerjF8lkKL8PEe5fHT65Q',
        // Google Developer Client ID
        clientId: '54741892006-r0oi7l7lf5mub0puh421ij5smd17sh4t.apps.googleusercontent.com',
        // Array of Discovery Docs
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
        // Scope of the request
        scope: 'https://www.googleapis.com/auth/youtube.readonly'
      });

      gapi.client.load('youtube', 'v3', () => console.log('loaded youtube'));

    });
  }

  async login() {
    const googleAuth = gapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn();
  
    const token = googleUser.getAuthResponse().id_token;
  
    console.log(googleUser);
    
    const credential = auth.GoogleAuthProvider.credential(token);

    await this.afAuth.auth.signInAndRetrieveDataWithCredential(credential);
  
  
    // Alternative approach, use the Firebase login with scopes and make RESTful API calls
    // const provider = new auth.GoogleAuthProvider()
    // provider.addScope('https://www.googleapis.com/auth/calendar');
    // this.afAuth.auth.signInWithPopup(provider)
    
  }
  
  logout() {
    console.log('logout clicked');
    this.afAuth.auth.signOut();
  }

  
  async getYoutubeInfo() {
    const events = await gapi.client.youtube.channels.list({
      mine: true,
      part: 'snippet,contentDetails,statistics'
    });

    
    console.log('youtube events');
    console.log(events);

    this.youtubeItems = events.result.items;
    

  }


}
