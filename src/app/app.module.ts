import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { Params, RouterModule, Routes } from '@angular/router';
import {CdkTableModule } from '@angular/cdk/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {
    AlertModule,
    BadgeLabelModule,
    ButtonModule, DatePickerModule, FormModule, IconModule,
    LoadingSpinnerModule, ModalModule, 
    PanelModule,
    ProductSwitchModule,
    ShellbarModule,
    SideNavigationModule,
    TableModule,
    InlineHelpModule,
    MultiInputModule,
    TileModule,
    FundamentalNgxCoreModule
} from '@fundamental-ngx/core';
import { ContractsComponent } from './components/contracts/contracts.component';
import { ProductsComponent } from './components/products/products.component';
import { StatusPipe } from './components/contracts/status.pipe';
import { CreateContractModalComponent } from './components/contracts/create-contract-modal/create-contract-modal.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateProductModalComponent } from './components/products/create-product-modal/create-product-modal.component';
import { CreateProductModalDetailedComponent } from './components/products/create-product-modal/create-product-modal-detailed/create-product-modal-detailed.component';

const routes: Routes = [ {
    path: '*/:first/:second',
    component: AppComponent,
} ]
@NgModule({
    declarations: [
        AppComponent,
        ContractsComponent,
        ProductsComponent,
        StatusPipe,
        CreateContractModalComponent,
        ConfirmModalComponent,
        DashboardComponent,
        CreateProductModalComponent,
        CreateProductModalDetailedComponent
        

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        CdkTableModule, DragDropModule,
        SideNavigationModule,
        PanelModule,
        ButtonModule,
        TableModule,
        BadgeLabelModule,
        LoadingSpinnerModule,
        ModalModule,
        AlertModule,
        FormsModule,
        ProductSwitchModule,
        MultiInputModule,
        InlineHelpModule,
        ReactiveFormsModule,
        FormModule,
        DatePickerModule,
        BrowserAnimationsModule,
        FundamentalNgxCoreModule,
        ShellbarModule,
        IconModule,
        TileModule,
        RouterModule.forRoot( routes ),
    ],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
    entryComponents: [
        CreateContractModalComponent,
        ConfirmModalComponent,
        CreateProductModalComponent,
        CreateProductModalDetailedComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
