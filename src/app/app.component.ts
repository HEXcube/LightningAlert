import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/pages/map',
      icon: 'home'
    },
    {
      title: 'Profile',
      url: '/pages/profile',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    private nav: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.firebaseAuth.authState.subscribe(firebaseUser => {
        if (firebaseUser) {
          // this.router.navigate(['']);
          // this.router.navigate(['pages']);
          this.nav.navigateForward(['pages']);
        }
      });
    });
  }

  logout() {
    this.authService.logout();
  }
}
