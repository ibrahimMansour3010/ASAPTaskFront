import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AlertHelperService } from 'src/app/core/helpers/alert-helper.service';
import { ManageInvoiceComponent } from '../manage-invoice/manage-invoice.component';
import { InvoiceService } from '../../services/invoice.service';
import { InvoiceListDto } from '../../models/invoice-listDto';
import { Icons } from 'src/app/core/enums/icons.enum';
import { ConfirmComponent } from 'src/app/shared/compenents/confirm/confirm.component';
import { InvoiceDto } from '../../models/invoiceDto.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.scss'
})
export class InvoiceListComponent {

  pageSize: number = 5;
  pageNumber: number = 1;
  totalRecords: number = 0;
  pages: number[] = [];
  invoices:InvoiceListDto[] = [];
  event: string = '';

  Icons: { [key: string]: SafeHtml } = {};
  // inject
  readonly dialog = inject(MatDialog);
  readonly alertHelper = inject(AlertHelperService);
  readonly invoiceService = inject(InvoiceService);
  readonly sanitizer = inject(DomSanitizer);
  readonly fb = inject(FormBuilder);

  ngOnInit(): void {
    this.Icons['Edit'] = this.sanitizer.bypassSecurityTrustHtml(Icons.Edit);
    this.Icons['Delete'] = this.sanitizer.bypassSecurityTrustHtml(Icons.Delete);

    this.getItemList();
  }
  getItemList() {
    this.invoiceService
      .getInvoiceList(this.pageSize, this.pageNumber )
      .subscribe((res) => {
        this.invoices = res.data.result;
        this.totalRecords = Number(res.data.allItemCount);
        this.pages = Array.from(
          { length: Math.ceil(this.totalRecords / this.pageSize) },
          (_, i) => i + 1
        );
      });
  }
  goToPage(page: number): void {
    if (page !== this.pageNumber) {
      this.pageNumber = page;
      this.getItemList();
    }
  }

  openEditDialog(element: InvoiceListDto) {
    this.invoiceService.getInvoiceForEdit(element.invoiceNumber).subscribe(res=>{
      let invoice = res.data as InvoiceDto;
      const itemForms = this.fb.array(
          res.data.items.map(item =>
          this.fb.group({
            id: [item.id],
            name: [item.name],
            unitPrice: [item.unitPrice],
            availableQuantity: [item.availableQuantity],
            selectedQuantity: [item.selectedQuantity]
          })
        )
      );
      if(res.succeeded){
        const dialogRef = this.dialog.open(ManageInvoiceComponent, {
          width: '50%',
          data: {
            invoice:invoice,
            itemForms:itemForms
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          this.getItemList();
        });
      }
    })
  }

  openDeleteDialog(element: InvoiceListDto) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '25%',
      data: {
        confirmMessage: `Do you Really Want To Delete This Invoice ${element?.invoiceNumber}`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      debugger
      if (result) {
        this.invoiceService.deleteInvoice(element.invoiceNumber).subscribe((res) => {
          if (res.succeeded) {
            this.alertHelper.showAlertMessage(
              'Item Has Been Deleted Successfully'
            );
            this.getItemList();
          }
        });
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ManageInvoiceComponent, {
      width: '70%',
      height: '80%'
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getItemList();
    });
  }

}
