import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(public db: FirestoreService) { }



  sendMessage(message: Message) {
    this.db.add('messages', message).then(result => {
      this.updateMessage(result.id);
    });
  }

  updateMessage(id) {
    const messageRef = this.db.doc(`messages/${id}`);
    const data = {
      messageId: id,
      createdAt: new Date(),
      updatedOn: new Date()
    };
    return messageRef.update(data);
  }


  archiveMessage(id) {
    const messageRef = this.db.doc(`messages/${id}`);
    const data = {
      archived: true,
      updatedOn: new Date()
    };
    return messageRef.update(data);
  }

  toInbox(id) {
    const messageRef = this.db.doc(`messages/${id}`);
    const data = {
      archived: false,
      updatedOn: new Date()
    };
    return messageRef.update(data);
  }

}
