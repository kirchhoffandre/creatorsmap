import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Message } from 'src/app/models/message';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-messaging-form',
  templateUrl: './messaging-form.component.html',
  styleUrls: ['./messaging-form.component.css']
})
export class MessagingFormComponent implements OnInit {

  myForm: FormGroup;

  // Form State
  loading = false;
  success = false;

  destroyForm = true;

  userObject: object;

  // Messaging Service
  currentLoggedInUser: any;
  message: Message = {
    sendFrom: {},
    sendTo: '',
    title: '',
    body: '',
    active: true,
    archived: false
  };

  routerId;


  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public db: FirestoreService,
    private messagingService: MessagingService) {

    this.currentLoggedInUser = this.auth.currentUser;
    console.log(this.currentLoggedInUser);

    this.userObject = auth.getUserObject();
    console.log(this.userObject);
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      textarea: ['', [Validators.required, Validators.minLength(5), Validators.min(5)]],
    });


    this.routerId = this.route.snapshot.params['id'];

    console.log(this.routerId);
    this.message.sendTo = this.routerId;
    this.message.sendFrom = this.userObject;

  }

  get title() {
    return this.myForm.get('title');
  }

  get textarea() {
    return this.myForm.get('textarea');
  }


  submitHandler() {
    this.message.title = this.myForm.value.title;
    this.message.body = this.myForm.value.textarea;
    this.messagingService.sendMessage(this.message);
    this.success = true;
  }





  cancel() {
    this.destroyForm = false;
  }

}
