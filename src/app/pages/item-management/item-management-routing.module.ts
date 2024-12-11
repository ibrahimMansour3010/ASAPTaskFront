import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemListComponent } from './compenents/item-list/item-list.component';
import { AuthGuard } from '../../core/auth/gaurd/auth.gaurd';

const routes: Routes = [
  {
    path:'',
    component:ItemListComponent,
    canActivate: [AuthGuard],

  },
  {
    path:'items',
    component:ItemListComponent,
    canActivate: [AuthGuard],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemManagementRoutingModule { }
