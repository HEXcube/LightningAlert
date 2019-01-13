import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public menuCtrl: MenuController,
    private nav: NavController
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(form: any) {
    const { email, password } = form.value;
    this.authService.login(email, password);
  }

  onForgotPassword() {
    this.nav.navigateRoot(['authentication', 'forgot-password']);
  }

  onRegister() {
    this.nav.navigateRoot(['authentication', 'register']);
  }

  /*
    Disable sidebar
    https://stackoverflow.com/questions/51610075/disable-menu-on-login-page-ionic-4/51637860#51637860
  */
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
}
