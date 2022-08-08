import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './gaurds/auth.guard'

const routes: Routes = [
  {
    path: 'banks',
    loadChildren: () => import('./public-pages/public-pages.module').then(m => m.PublicPagesModule)
  },
  {
    path: 'bank-details',
    canActivate: [AuthGuard],
    loadChildren: () => import('./private-pages/private-pages.module').then(m => m.PrivatePagesModule)
  },
  {
    path: '',
    redirectTo: '/banks',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
