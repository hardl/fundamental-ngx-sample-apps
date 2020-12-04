import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LuigiAutoRoutingService, LuigiPreloadComponent } from '@luigi-project/client-support-angular/';
import {ContractsComponent} from './components/contracts/contracts.component';
import {ProductsComponent} from './components/products/products.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/auth/login/login.component';
import {UsersComponent} from './components/users/users.component';

const routes: Routes = [
  { path: 'auth', component:  LoginComponent},
  { path: 'dashboard', component: DashboardComponent, data: { luigiRoute: '/home/db' }},
  { path: 'contracts', component: ContractsComponent, data: { luigiRoute: '/home/contracts' }},
  { path: 'products', component: ProductsComponent, data: { luigiRoute: '/home/products' }},
  { path: 'users', component:  UsersComponent, data: { luigiRoute: '/home/users' }},
  { path: 'preload', component:  LuigiPreloadComponent, data: { fromVirtualTreeRoot: false }},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: '**',  redirectTo:  'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'corrected' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
    constructor(private navSvc: LuigiAutoRoutingService) {}
 }
