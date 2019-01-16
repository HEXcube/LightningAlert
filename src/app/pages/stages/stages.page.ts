import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.page.html',
  styleUrls: ['./stages.page.scss']
})
export class StagesPage implements OnInit {
  public listItems = [];

  private itemCollection: AngularFirestoreCollection<Image>;
  item: Observable<Image>;

  constructor(
    private afs: AngularFirestore,
    private nav: NavController,
    private authService: AuthService,
    public menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.afs
      .collection('Images')
      .snapshotChanges()
      .subscribe((images: any) => {
        images.map((image: any) => {
          const id = image.payload.doc.id;
          const item = image.payload.doc.data();

          this.listItems.push({ id, ...item });
        });
      });
  }

  goto(imageObj) {
    this.nav.navigateForward(['pages', 'casting', imageObj.id]);
  }

  logout() {
    this.authService.logout();
  }
}

interface Image {
  Url: String;
  Description: String;
  Thumbnail: String;
}
