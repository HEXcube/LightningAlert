import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  items: Observable<Profile[]>;
  relatives: any;

  constructor(private afs: AngularFirestore, private auth: AuthService) {
    // this.itemsCollection = afs.collection<Profile>('Profiles').doc();
    // this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit() {
    this.auth.uid.subscribe(uid => {
      console.log('uid', uid);
      this.afs
        .collection<Profile>('Profiles')
        .doc(uid)
        .valueChanges()
        .subscribe(data => {
          console.log('profile data', data);
        });
      this.afs
        .collection<Profile>('Profiles')
        .doc(uid)
        .collection('Relatives')
        .valueChanges()
        .subscribe(data => {
          console.log('relatives data', data);
          this.relatives = data;
        });
    });
  }
}

export interface Profile {
  uid: string;
  name: string;
  relatives: CollectionReference;
}
