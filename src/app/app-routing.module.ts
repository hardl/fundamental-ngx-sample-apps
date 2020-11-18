import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreloadComponent, LuigiAutoRoutingService } from '@m_bro_exp/client-support-angular';
import {ContractsComponent} from './components/contracts/contracts.component';
import {ProductsComponent} from './components/products/products.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/auth/login/login.component';
import {UsersComponent} from './components/users/users.component';

const routes: Routes = [
  { path: 'auth', component:  LoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'contracts', component: ContractsComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'users', component:  UsersComponent},
  { path: 'preload', component:  PreloadComponent},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: '**',  redirectTo:  'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'corrected' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
    constructor(private navSvc: LuigiAutoRoutingService) {
        navSvc.setConfig({
            useVirtualTree: false,
            routeMapping: [
                { path: '/dashboard', luigiRoute: '/home/db' },
                { path: '/contracts', luigiRoute: '/home/contracts' },
                { path: '/products', luigiRoute: '/home/products' },
                { path: '/users', luigiRoute: '/home/users' }
            ]
        });
    }
 }
