import {Component, OnInit, OnDestroy} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, Subscription} from 'rxjs';
import {Contract} from '../../models/contract.model';
import {Product} from '../../models/product.model';
import {ContractsService} from 'src/app/services/contracts/contracts.service';
import {ProductsService} from 'src/app/services/products/products.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

    contracts: Contract[];
    products: Product[];
    subscriptionContract: Subscription;
    subscriptionProduct: Subscription;
    
    constructor(db: AngularFirestore ,public productService:ProductsService, public contractService: ContractsService) {
    }

    ngOnInit() {
      this.subscriptionProduct = this.productService.getItems().subscribe(data => {
        const databaseData = Object.keys(data).map(i => data[i]);
        this.products = databaseData;
      });
      this.subscriptionContract = this.contractService.getContractsObservable().subscribe(data => {
        const databaseData = Object.keys(data).map(i => data[i]);
        this.contracts = databaseData;
      });
    }

    ngOnDestroy() {
      this.subscriptionProduct.unsubscribe();
      this.subscriptionContract.unsubscribe();
    }
}
