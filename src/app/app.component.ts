import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fadeAnimation, fader } from './route-animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    // fader,
    // slider,
    // transformer,
    fader
  ]
})
export class AppComponent {
  
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animations'];
  }
}
