import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/native/home/home.component';
import { PrivacyComponent } from '../components/native/misc/privacy/privacy.component';
import { AboutComponent } from '../components/native/misc/about/about.component';
import { MissionComponent } from '../components/native/misc/mission/mission.component';
import { ErrorComponent } from '../components/native/misc/error/error.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'mission', component: MissionComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: '**', component: ErrorComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
