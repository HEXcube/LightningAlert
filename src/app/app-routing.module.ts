import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'authentication',
    pathMatch: 'full'
  },
  {
    path: 'authentication',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
  },
  {
    path: 'pages',
    canActivate: [AuthGuard],
    loadChildren: './pages/pages.module#PagesModule'
  },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
