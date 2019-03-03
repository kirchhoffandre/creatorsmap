import { Component, OnInit } from '@angular/core';
import { MessagingService } from 'src/app/services/messaging.service';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-messaging-list',
  templateUrl: './messaging-list.component.html',
  styleUrls: ['./messaging-list.component.css']
})
export class MessagingListComponent implements OnInit {

  // loggedIn User
  loggedInUser;

  constructor(private messagingService: MessagingService, public auth: AuthService, private db: FirestoreService) {
    this.loggedInUser = this.auth.getUserObject();
    console.log(this.loggedInUser);
    console.log(this.auth);
    console.log(this.auth.userObject);
  }

  ngOnInit() {
    console.log(this.auth.currentUserId);
   // this.db.col$('messages', ref => ref.where('user', '==', loggedInUser.))

  }

}
