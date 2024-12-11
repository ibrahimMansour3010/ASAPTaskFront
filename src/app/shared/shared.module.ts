import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { LayoutModule } from './layout/layout.module';
import { LoaderComponent } from './compenents/loader/loader.component';
import { ConfirmComponent } from './compenents/confirm/confirm.component';
import { NoDataAvailableComponent } from './compenents/no-data-available/no-data-available.component';

@NgModule({
  declarations: [
    LoaderComponent,
    ConfirmComponent,
    NoDataAvailableComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    LayoutModule,
  ],
  exports:[
    LayoutModule,
    NoDataAvailableComponent
  ]
})
export class SharedModule { }
