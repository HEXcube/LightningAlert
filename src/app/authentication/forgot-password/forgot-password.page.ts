import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss']
})
export class ForgotPasswordPage implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private nav: NavController
  ) {}
  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required]
    });
  }

  onSubmit() {
    const { email } = this.form.value;
    this.authService.resetPassword(email);
  }

  onLogin() {
    this.nav.goBack();
  }

  onRegister() {
    this.router.navigate(['register'], { relativeTo: this.route.parent });
  }
}
