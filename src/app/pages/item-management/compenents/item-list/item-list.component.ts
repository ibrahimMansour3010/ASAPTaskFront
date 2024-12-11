import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ItemListDto } from '../../models/item-list.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ManageItemComponent } from '../manage-item/manage-item.component';
import { AlertHelperService } from 'src/app/core/helpers/alert-helper.service';
import { ItemService } from '../../services/item.service';
import { Icons } from 'src/app/core/enums/icons.enum';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ConfirmComponent } from 'src/app/shared/compenents/confirm/confirm.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
})
export class ItemListComponent implements OnInit {

  pageSize: number = 5;
  pageNumber: number = 1;
  totalRecords: number = 0;
  pages: number[] = [];
  items:ItemListDto[] = [];
  event: string = '';

  Icons: { [key: string]: SafeHtml } = {};
  // inject
  readonly dialog = inject(MatDialog);
  readonly alertHelper = inject(AlertHelperService);
  readonly itemService = inject(ItemService);
  readonly sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    this.Icons['Edit'] = this.sanitizer.bypassSecurityTrustHtml(Icons.Edit);
    this.Icons['Delete'] = this.sanitizer.bypassSecurityTrustHtml(Icons.Delete);

    this.getItemList();
  }
  getItemList() {
    this.itemService
      .getItemList(this.pageSize, this.pageNumber )
      .subscribe((res) => {
        this.items = res.data.result;
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

  openDialog() {
    const dialogRef = this.dialog.open(ManageItemComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getItemList();
    });
  }

  openEditDialog(element: any) {
    const dialogRef = this.dialog.open(ManageItemComponent, {
      width: '50%',
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getItemList();
    });
  }

  openDeleteDialog(element: ItemListDto) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '25%',
      data: {
        confirmMessage: `Do you Really Want To Delete This Item ${element?.name}`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.itemService.deleteItem(element.id).subscribe((res) => {
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
}
