import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-casting',
  templateUrl: './casting.page.html',
  styleUrls: ['./casting.page.scss']
})
export class CastingPage implements OnInit {
  public listCards = [
    {
      colorCode: 'green',
      distance: '300 yds',
      size: '18"x22"',
      type: 'Half IPSC'
    },
    {
      colorCode: 'purple',
      distance: '450 yds',
      size: '18"x22"',
      type: 'Half IPSC'
    },
    {
      colorCode: 'white',
      distance: '600 yds',
      size: '18"x22"',
      type: 'Half IPSC'
    },
    {
      colorCode: 'blue',
      distance: '850 yds',
      size: '36"x44"',
      type: 'Full IPSC'
    }
  ];
  id: string;
  thumbnail: any;
  castingImage: any = null;

  constructor(
    public menuCtrl: MenuController,
    private route: ActivatedRoute,
    private afs: AngularFirestore
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    const imageDoc = this.afs.doc<any>(`Images/${this.id}`);
    imageDoc.snapshotChanges().subscribe(imageObj => {
      const id = imageObj.payload.id;
      const item: any = imageObj.payload.data();
      this.thumbnail = item.Thumbnail;
      this.castingImage = item.Url;
    });
  }

  /*
    Disable sidebar
    https://stackoverflow.com/questions/51610075/disable-menu-on-login-page-ionic-4/51637860#51637860
  */
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
}
