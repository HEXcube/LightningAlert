import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private firestore: AngularFirestore) {}

  getProfile(uid: string) {
    return this.firestore
      .collection('Profiles')
      .doc(uid)
      .snapshotChanges();
  }

  createProfile(Profile: any) {
    return this.firestore.collection('Profiles').add(Profile);
  }

  deleteProfile(uid: string) {
    return this.firestore
      .collection('Profiles')
      .doc(uid)
      .delete();
  }
}
