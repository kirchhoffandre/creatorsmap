import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { User } from './user.model';
import { FirestoreService } from './firestore.service';


declare var gapi: any;


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  user$: Observable<firebase.User>;
  channelID: string;



  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router, public db: FirestoreService) {
    this.initClient();
    this.user$ = this.afAuth.authState.pipe(
      switchMap( user => {
        if(user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );

    
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

    console.log('my google user');
    console.log(googleUser);
    
    const credential = auth.GoogleAuthProvider.credential(token);
    await this.afAuth.auth.signInAndRetrieveDataWithCredential(credential);
    
    await this.getYoutubeInfo();

    return this.updateUserData(this.afAuth.auth.currentUser);
    // Alternative approach, use the Firebase login with scopes and make RESTful API calls
    // const provider = new auth.GoogleAuthProvider()
    // provider.addScope('https://www.googleapis.com/auth/calendar');
    // const credential =  this.afAuth.auth.signInWithPopup(provider);

    
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = { 
      uid: user.uid, 
      email: user.email, 
      displayName: user.displayName, 
      photoURL: user.photoURL,

    };

    return userRef.set(data, { merge: true });

  }


  logout() {
    console.log('logout clicked');
    this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }


  async getYoutubeInfo() {
    try{
      const events = await gapi.client.youtube.channels.list({
        mine: true,
        part: 'contentDetails, snippet, statistics,brandingSettings, contentOwnerDetails, topicDetails'
      });
      console.log(events);
      
         // Youtube Data
      const userRef: AngularFirestoreDocument = this.afs.doc(`users/${this.afAuth.auth.currentUser.uid}`);

      userRef.set(events.result.items[0], { merge: true });

      this.router.navigate(['/useradmin']);
    } catch (error) {
      console.log(error);
      this.router.navigate(['/']);
    }
    

  }


  getAuthStatus() {
    return this.afAuth.auth.currentUser.uid;
  }

  get authenticated(): boolean {
    return this.afAuth !== null;
  }

  get currentUser(): any {
    return this.authenticated ? this.afAuth.auth : null;
  }

  get currentUserId(): string {
    return this.authenticated ? this.afAuth.auth.currentUser.uid : '';
  }





}


