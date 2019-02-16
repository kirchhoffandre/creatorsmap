import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-creatordetail',
  templateUrl: './creatordetail.component.html',
  styleUrls: ['./creatordetail.component.css']
})
export class CreatordetailComponent implements OnInit {
  creator$;

  constructor(public db: FirestoreService, private route: ActivatedRoute ) { }

  ngOnInit() {

    this.creator$ = this.route.paramMap.pipe(
      switchMap(params => {
        console.log('hello router');
        const id = params.get('id');
        console.log(id);
        return this.creator$ = this.db.doc$('users/' + id);
      })

    );


  }

}
