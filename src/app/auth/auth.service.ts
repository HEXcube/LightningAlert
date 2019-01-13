import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable()
export class AuthService {
  user = { isAdmin: false };
  token: any;
  authenticated = false;

  constructor(
    private firebaseAuth: AngularFireAuth,
    public router: Router,
    private nav: NavController
  ) {
    this.firebaseAuth.authState.subscribe(firebaseUser => {
      console.log('user', firebaseUser);

      if (firebaseUser) {
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
        this.authenticated = true;
        this.nav.navigateForward(['pages']);
        this.token = value;
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  createUser(email, password) {
    // const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return this.firebaseAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
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
}
