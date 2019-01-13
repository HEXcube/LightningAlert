import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.page.html',
  styleUrls: ['./stages.page.scss']
})
export class StagesPage implements OnInit {
  public listItems = [];

  private itemCollection: AngularFirestoreCollection<Image>;
  item: Observable<Image>;

  constructor(private afs: AngularFirestore, private nav: NavController) {}

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
    console.log('selected id', imageObj);
    this.nav.navigateForward(['pages', 'casting', imageObj.id]);
  }
}

interface Image {
  Url: String;
  Description: String;
  Thumbnail: String;
}
