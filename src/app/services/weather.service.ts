import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Darksky from 'darkskyjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private firestore: AngularFirestore, private http: HttpClient) {}

  private getHeaders() {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Headers', '*');
    return headers;
  }

  getCurrentWeatherDetails(latitude: any, longitude: any) {
    Darksky.getCurrentConditions(
      [
        // location object(s)
        {
          latitude,
          longitude,
          name: 'London'
        }
      ],
      // callback
      function(conditions) {
        for (let i = 0, length = conditions.length; i < length; i++) {
          if (conditions[i].name === 'London') {
            console.log(conditions[i].cloudCover());
          }
        }
      }
    );
  }
}
