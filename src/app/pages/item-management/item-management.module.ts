import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemManagementRoutingModule } from './item-management-routing.module';
import { ItemListComponent } from './compenents/item-list/item-list.component';
import { ManageItemComponent } from './compenents/manage-item/manage-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';


@NgModule({
  declarations: [
    ItemListComponent,
    ManageItemComponent,
  ],
  imports: [
    CommonModule,
    ItemManagementRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
  ]
})
export class ItemManagementModule { }
