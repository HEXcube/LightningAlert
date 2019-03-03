import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MlService {
  constructor(private firestore: AngularFirestore, private http: HttpClient) {}
  getHeaders() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  getPrediction() {
    const options = {
      headers: this.getHeaders()
    };

    return this.http
      .post(`${environment.MLServerURL}api`, { exp: 1.8 }, options)
      .subscribe(
        val => {
          console.log(val);
        },
        err => {
          console.log(err);
        }
      );
  }
}
