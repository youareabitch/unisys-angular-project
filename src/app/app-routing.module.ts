import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then(x => x.HomeComponent)
  },
  {
    path: 'transaction',
    loadComponent: () => import('./components/transaction-page/transaction-page.component').then(x => x.TransactionPageComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./components/about/about.component').then(x => x.AboutComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
