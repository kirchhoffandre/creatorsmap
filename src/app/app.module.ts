import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* Angular Fire */
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';


/* My Router */
import { RouterModule, Router } from '@angular/router';
import { AppRoutingModule } from './app-routing/app-routing.module';

/* My Components */
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/native/header/header.component';
import { FooterComponent } from './components/native/footer/footer.component';
import { HomeComponent } from './components/native/home/home.component';
import { environment } from '../environments/environment.prod';
import { PrivacyComponent } from './components/native/misc/privacy/privacy.component';
import { AboutComponent } from './components/native/misc/about/about.component';
import { MissionComponent } from './components/native/misc/mission/mission.component';
import { ErrorComponent } from './components/native/misc/error/error.component';

/* My Forms */
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatInputModule} from '@angular/material';
import { ContactsComponent } from './components/contacts/contacts.component';
import { YoutubeLoginComponent } from './components/login/youtube-login/youtube-login.component';
import { UseradminComponent } from './components/user/useradmin/useradmin.component';
import { FormsModule } from '@angular/forms';


/* My Angular Google Maps */
import { AgmCoreModule } from '@agm/core';
import { HomemapComponent } from './components/maps/homemap/homemap.component';
// Snazzy Maps Imports
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { CreatorsComponent } from './components/user/creators/creators.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PrivacyComponent,
    AboutComponent,
    MissionComponent,
    ErrorComponent,
    ContactsComponent,
    YoutubeLoginComponent,
    UseradminComponent,
    HomemapComponent,
    CreatorsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AppRoutingModule, 
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    }),
    AgmSnazzyInfoWindowModule,
    AgmJsMarkerClustererModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
