import { Component, OnInit } from '@angular/core';
import { MessagingService } from 'src/app/services/messaging.service';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-messaging-list',
  templateUrl: './messaging-list.component.html',
  styleUrls: ['./messaging-list.component.css']
})
export class MessagingListComponent implements OnInit {

  // loggedIn User
  loggedInUser;
  messages;
  messagearchive;

  loggedInUserId;

  archiv = false;

  constructor(
    private messagingService: MessagingService, 
    public auth: AuthService, 
    private afs: AngularFireAuth, 
    private db: FirestoreService) 
    {
      this.afs.authState.subscribe(user => {
      this.loggedInUserId = user.uid;

      this.messages = this.db.col$('messages', ref => ref
      .where('sendTo', '==', user.uid)
      .where('archived', '==', false));
      
      this.messagearchive = this.db.col$('messages', ref => ref
      .where('sendTo', '==', user.uid)
      .where('archived', '==', true));

    });
    
    

  }

  ngOnInit() {
  

   // this.db.col$('messages', ref => ref.where('user', '==', loggedInUser.))
   
    
    /*
    , ref => ref.
      where('sendTo', '==', 'i1tGeSv24YhOIy9TbFYIpVczdqD2').
      where('archived', '==', false).
      orderBy('createdAt', 'desc'));
    */
  }


  showArchive() {
    console.log(this.archiv);
    this.archiv = !this.archiv;
  }


  archiveMessage(messageId) {
    console.log(messageId);
    this.messagingService.archiveMessage(messageId);
  }

  toInbox(messageId) {
    console.log(messageId);
    this.messagingService.toInbox(messageId);
  }


}
