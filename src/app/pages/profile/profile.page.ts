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
  _profile: any;
  _relatives: any;

  constructor(private afs: AngularFirestore, private auth: AuthService) {
    // this.itemsCollection = afs.collection<Profile>('Profiles').doc();
    // this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit() {
    this.auth.uid.subscribe(uid => {
      console.log('uid', uid);
      this._profile = this.afs.collection<Profile>('Profiles').doc(uid);
      this._relatives = this.afs
        .collection<Profile>('Profiles')
        .doc(uid)
        .collection('Relatives');

      this._profile.valueChanges().subscribe(data => {
        console.log('profile data', data);
      });

      this._relatives.valueChanges().subscribe(data => {
        console.log('relatives data', data);
        this.relatives = data;
      });
    });
  }

  addContact(name: string, mobile: string) {
    if (name && mobile) {
      this._relatives.add({
        name,
        mobile
      });
    } else {
      alert('please add valid data');
    }
  }

  updateContact(update_name: string, update_mobile: string) {}
}

export interface Profile {
  uid: string;
  name: string;
  relatives: CollectionReference;
}
