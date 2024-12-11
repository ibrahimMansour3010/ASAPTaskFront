import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceManagementRoutingModule } from './invoice-management-routing.module';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { ManageInvoiceComponent } from './components/manage-invoice/manage-invoice.component';


@NgModule({
  declarations: [
    InvoiceListComponent,
    ManageInvoiceComponent
  ],
  imports: [
    CommonModule,
    InvoiceManagementRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    TablerIconsModule.pick(TablerIcons),
  ]
})
export class InvoiceManagementModule { }
