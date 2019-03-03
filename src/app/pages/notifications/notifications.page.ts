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
      colorName: 'danger',
      iconName: 'alert',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
    },
    {
      colorName: 'primary',
      iconName: 'square',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
    },
    {
      colorName: 'warning',
      iconName: 'sunny',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
    },
    {
      colorName: 'primary',
      iconName: 'square',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
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
