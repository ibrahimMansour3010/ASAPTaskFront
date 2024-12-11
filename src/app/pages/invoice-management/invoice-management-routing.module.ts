import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';

const routes: Routes = [
  {
    path:'',
    component:InvoiceListComponent
  },
  {
    path:'invoice-list',
    component:InvoiceListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceManagementRoutingModule { }
