import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  downloadURL: Observable<any>;
  uploadPercent: Observable<number>;
  profilePicdataURL: any;
  errorMessage: any;
  form: FormGroup;
  fileToUpload: File = null;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private af: AngularFirestore,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
    private nav: NavController
  ) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        // name: ['', Validators.required],
        // id: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      { validator: PasswordValidation.MatchPassword }
    );
  }

  onSubmit() {
    console.log('event', this.form.value);
    const { name, email, password, id } = this.form.value;

    this.authService
      .createUser(email, password)
      .then((value: any) => {
        // const { uid } = value;
        // this.addNewUser(email, name, id, uid);
      })
      .catch(err => {
        console.log(err);
        this.errorMessage = err.message;
        setTimeout(() => {
          this.errorMessage = null;
        }, 4000);
      });
  }

  addNewUser(email, id, name, uid) {
    this.af
      .collection('users')
      .doc(uid)
      .set({
        email,
        id,
        name,
        uid
      })
      .then(value => {
        this.nav.navigateRoot(['pages']);
      });
  }

  uploadProfilePic(event) {
    const file = event.target.files[0];
    const filePath = `/profile-${Date.now()}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);

    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task
      .snapshotChanges()
      .pipe(finalize(() => (this.downloadURL = ref.getDownloadURL())))
      .subscribe();
  }

  onForgotPassword() {
    this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
  }

  onLogin() {
    this.nav.goBack();
  }
}

export class PasswordValidation {
  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value; // to get value in input tag
    const confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    if (password !== confirmPassword) {
      AC.get('confirmPassword').setErrors({ MatchPassword: true });
    } else {
      return null;
    }
  }
}
