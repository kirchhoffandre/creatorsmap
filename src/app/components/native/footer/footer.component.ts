import { Component, OnInit } from '@angular/core';
import { fadeAnimation, fader } from '../../../route-animations';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  animations: [
    // fader,
    // slider,
    // transformer,
    fader
  ]
})
export class FooterComponent implements OnInit {
  

  constructor() { }

  ngOnInit() {
  }

  

}
