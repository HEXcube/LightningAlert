import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';

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
    public menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(form: any) {
    console.log(form.value);
    const { email, password } = form.value;
    this.authService.login(email, password);
  }

  onForgotPassword() {
    this.router.navigate(['forgot-password'], {
      relativeTo: this.route.parent
    });
  }

  onRegister() {
    this.router.navigate(['register'], { relativeTo: this.route.parent });
  }

  /*
    Disable sidebar
    https://stackoverflow.com/questions/51610075/disable-menu-on-login-page-ionic-4/51637860#51637860
  */
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
}
