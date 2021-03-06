import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  constructor(private firestore: AngularFirestore, private http: HttpClient) {}
  getHeaders() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  sendSMS() {
    const options = {
      headers: this.getHeaders()
    };

    return this.http.post(`${environment.SMSServerUrl}`, options).subscribe(
      val => {
        console.log(val);
      },
      err => {
        console.log(err);
      }
    );
  }
}
