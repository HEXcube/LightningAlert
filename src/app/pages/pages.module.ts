import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full'
  },
  {
    path: 'casting/:id',
    loadChildren: './casting/casting.module#CastingPageModule'
  },
  {
    path: 'preview',
    loadChildren: './preview/preview.module#PreviewPageModule'
  },
  { path: 'stages', loadChildren: './stages/stages.module#StagesPageModule' },
  { path: 'map', loadChildren: './map/map.module#MapPageModule' }
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' }
];
@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
  declarations: []
})
export class PagesModule {}
