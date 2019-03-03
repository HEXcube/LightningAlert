import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  constructor(private firestore: AngularFirestore) {}

  getProfile(uid: string) {
    return this.firestore
      .collection('Profiles')
      .doc(uid)
      .snapshotChanges();
  }

  createPolicy(policy: any) {
    return this.firestore.collection('Profiles').add(policy);
  }

  deletePolicy(policyId: string) {
    return this.firestore
      .collection('Profiles')
      .doc(policyId)
      .delete();
  }
}
