import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      textarea: ['', [Validators.required, Validators.minLength(5), Validators.min(5)]],
  
    });
  }

  get name() {
    return this.myForm.get('name');
  }

  get textarea() {
    return this.myForm.get('textarea');
  }








  cancel(){
    this.destroyForm = false;
  }

}
