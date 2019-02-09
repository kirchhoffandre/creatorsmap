import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-creators',
  templateUrl: './creators.component.html',
  styleUrls: ['./creators.component.css']
})
export class CreatorsComponent implements OnInit {
  creatorList$: Observable<any>;
  
  constructor(public db: FirestoreService, public afs: AngularFirestore) {
    this.creatorList$ = this.db.col$('users');
  }

  ngOnInit() {
  }

}
