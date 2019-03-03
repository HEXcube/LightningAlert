import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full'
  },
  { path: 'map', loadChildren: './map/map.module#MapPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsPageModule' }
];
@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
  declarations: []
})
export class PagesModule {}
