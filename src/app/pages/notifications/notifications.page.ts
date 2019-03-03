import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
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

  constructor(
    public menuCtrl: MenuController
  ) {}

  ngOnInit() {
  }

  /*
    Disable sidebar
    https://stackoverflow.com/questions/51610075/disable-menu-on-login-page-ionic-4/51637860#51637860
  */
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
}
