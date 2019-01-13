import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavParams } from '@ionic/angular';

const routes = [
  {
    path: '',
    redirectTo: 'stages',
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
  { path: 'stages', loadChildren: './stages/stages.module#StagesPageModule' }
];
@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
  declarations: []
})
export class PagesModule {}
