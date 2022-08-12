import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './gaurds/auth.guard'

/** Homepage is /banks
 * Implemented lazy loading 
 * route gaurds implemented for keeping bank details private
 * public pages is accessible without login
 * private pages can be accessed only after login
 */

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
  },
  {
    path: '**',
    redirectTo: '/banks',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
