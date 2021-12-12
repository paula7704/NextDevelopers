import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './master/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'security',
    loadChildren: () =>
      import('./moduls/security/security.module').then((x) => x.SecurityModule),
  },
  {
    path: 'administration',
    loadChildren: () =>
      import('./moduls/administration/administration.module').then((x) => x.AdministrationModule),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./moduls/orders/orders.module').then((x) => x.OrdersModule),
  },
  {
    path: 'parameters',
    loadChildren: () =>
      import('./moduls/parameters/parameters.module').then((x) => x.ParametersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
