import {Component, OnInit, ViewChild} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, Subscription} from 'rxjs';
import {Contract} from '../../models/contract.model';
import {AlertService, ModalService, CalendarModule} from '@fundamental-ngx/core';
import {CreateContractModalComponent} from './create-contract-modal/create-contract-modal.component';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';
import { Product } from 'src/app/models/product.model';
import { CdkTable } from '@angular/cdk/table';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import {ContractsService} from 'src/app/services/contracts/contracts.service';

@Component({
    selector: 'app-contracts',
    templateUrl: './contracts.component.html',
    styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {

    contracts: any;
    selected: Contract[] = [];
    filteredDataSource: Contract[];
    subscription: Subscription;
    columnHeaders: string [] = ['company', 'contact', 'signed', 'type', 'value', 'status', 'edit', 'remove'];


    @ViewChild('table', {static: false}) table: CdkTable<{}[]>;

    dataSource: Contract[];

    dropRow(event) {
        const previousIndex = this.contracts.findIndex((d) => d === event.item.data);
        moveItemInArray(this.contracts, previousIndex, event.currentIndex);
        this.table.renderRows();
    }

    displayFunc(obj: any): string {
        return obj.company;
    }

    refresh() {
        if (this.selected.length === 0) {
            this.filteredDataSource = this.dataSource;
            } else { this.filteredDataSource = this.selected; }
        this.table.renderRows();
    }



    constructor(contractService: ContractsService, db: AngularFirestore, private modalService: ModalService, private alertService: AlertService) {
      contractService.getContractsObservable().subscribe(data => {
        const databaseData = Object.keys(data).map(i => data[i]);
        this.contracts = databaseData;
        this.dataSource = databaseData;
        this.filteredDataSource = databaseData;
        });
}

    ngOnInit() {
    }

    ngAfterViewInit () {
      
    }

    openCreateModal(): void {
        this.modalService.open(CreateContractModalComponent, {
            data: {}
        }).afterClosed.subscribe(result => {
            if (result) {
                this.alertService.open('Create not allowed in this version.', {
                    type: 'warning'
                });
            }
        }, () => {});
    }

    openEditModal(newContract: Contract): void {
        const copyObj = Object.assign({}, newContract);
        copyObj.signed = newContract.signed.toDate();
        this.modalService.open(CreateContractModalComponent, {
            data: {
                editMode: true,
                contract: copyObj
            }
        }).afterClosed.subscribe(result => {
            if (result) {
                this.alertService.open('Edit not allowed in this version.', {
                    type: 'warning'
                });
            }
        }, () => {});
    }

    openConfirmModal(): void {
        this.modalService.open(ConfirmModalComponent).afterClosed.subscribe(result => {
            if (result) {
                this.alertService.open('Delete not allowed in this version.', {
                    type: 'warning'
                });
            }
        }, () => {});
    }

}
