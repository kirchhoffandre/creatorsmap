import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-youtube-login',
  templateUrl: './youtube-login.component.html',
  styleUrls: ['./youtube-login.component.css']
})
export class YoutubeLoginComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
