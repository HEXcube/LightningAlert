import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
  user = { isAdmin: false };
  token: any;
  authenticated = false;
  uid: Observable<string>;

  constructor(
    private firebaseAuth: AngularFireAuth,
    public router: Router,
    private nav: NavController,
    public toastController: ToastController,
    private firestore: AngularFirestore,
    private http: HttpClient
  ) {
    this.firebaseAuth.authState.subscribe(firebaseUser => {
      if (firebaseUser) {
        this.uid = of(firebaseUser.uid);
        // this.nav.navigateForward(['..', 'pages']);
        // this.nav.navigateRoot(['pages']);
        this.authenticated = true;
      }
    });
  }

  checkPermission() {
    return of(this.authenticated);
  }

  isLoggedIn() {
    return of(this.authenticated);
  }

  login(email: string, password: string) {
    this.firebaseAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.token = value;
      })
      .then(() => {
        this.authenticated = true;
        this.nav.navigateForward(['pages']);
      })
      .catch(err => {
        this.presentToast(err.message);
      });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  createUser(email, password) {
    // const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return this.firebaseAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        this.firestore
          .collection('Profiles')
          .doc(data.user.uid)
          .set({
            uid: data.user.uid
          });
        this.emailVerification();
      });
  }

  logout() {
    this.firebaseAuth.auth
      .signOut()
      .then(() => {
        this.token = null;
        this.authenticated = false;
        this.nav.navigateRoot(['authentication']);
      })
      .catch(() => {
        console.log('error');
      });
  }

  getToken() {
    return this.token;
  }

  isAuthenticated() {
    // here you can check if user is authenticated or not through his token
    return this.authenticated;
  }

  async emailVerification() {
    try {
      await this.firebaseAuth.auth.currentUser.sendEmailVerification();
      return console.log('sent Password Reset Email!');
    } catch (error) {
      return console.log(error);
    }
  }

  async resetPassword(email: string) {
    try {
      await this.firebaseAuth.auth.sendPasswordResetEmail(email);
      return console.log('sent Password Reset Email!');
    } catch (error) {
      return console.log(error);
    }
  }

  getHeaders() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  authThirdParties(uid) {}

  authSMSServer(client) {
    const options = {
      headers: this.getHeaders()
    };

    console.log('client details in service', client);
    return this.http
      .post(`${environment.SMSServerUrl}/client`, { client }, options)
      .subscribe(value => {
        console.log('value', value);
      });
  }

  authMLServer(client) {
    const options = {
      headers: this.getHeaders()
    };

    console.log('client details in service', client);
    return this.http
      .post(`${environment.MLServerURL}/client`, { client }, options)
      .subscribe(value => {
        console.log('value', value);
      });
  }
}
