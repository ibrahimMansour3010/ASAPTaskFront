import { AlertHelperService } from 'src/app/core/helpers/alert-helper.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InvoiceDto, ItemDetailsDto } from '../../models/invoiceDto.model';
import { AlertMessageType } from 'src/app/core/enums/alert-message-type';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-manage-invoice',
  templateUrl: './manage-invoice.component.html',
  styleUrl: './manage-invoice.component.scss',
})
export class ManageInvoiceComponent implements OnInit {
  invoiceForm!: FormGroup;
  invoiceDto: InvoiceDto = { items: [] };
  itemList: ItemDetailsDto[] = [];
  selectedItem: ItemDetailsDto | null = null;

  constructor(
    private dialog: MatDialog,
    private alertHelperService: AlertHelperService,
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    public dialogRef: MatDialogRef<ManageInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Receiving data passed to dialog
  ) {
    if (this.data) this.invoiceDto = this.data.invoice;
  }

  ngOnInit(): void {
    this.initializeForm();
    this.invoiceService.getInvoiceLookup().subscribe((res) => {
      this.itemList = res.data?.items;
    });
  }
  onChangeItem(event: any) {
    this.selectedItem = event;
  }
  // Initialize the main invoice form
  initializeForm() {
    // Ensure the passed FormArray is valid and contains FormGroup elements
    this.invoiceForm = this.fb.group({
      id: [this.invoiceDto.id],
      items: this.fb.array(
        this.invoiceDto.items?.map((item) =>
          this.fb.group({
            id: [item.id],
            name: [item.name],
            unitPrice: [item.unitPrice, [Validators.required]],
            availableQuantity: [item.availableQuantity, [Validators.required]],
            selectedQuantity: [item.selectedQuantity, [Validators.required]],
            price:[item.price]
          })
        ) || [] // Fallback to an empty array if items are null or undefined
      ),
      totalPrice: [
        this.invoiceDto.totalPrice,
        [Validators.required, Validators.min(1)],
      ],
    });
  }

  // Get the FormArray for products
  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  // Add a new product to the products FormArray
  addItem() {
    debugger;
    const itemFrom = this.fb.group({
      id: [this.selectedItem?.id],
      name: [this.selectedItem?.name, Validators.required],
      unitPrice: [
        this.selectedItem?.unitPrice,
        [Validators.required, Validators.min(0)],
      ],
      availableQuantity: [
        this.selectedItem?.availableQuantity,
        [Validators.required, Validators.min(0)],
      ],
      selectedQuantity: [
        this.selectedItem?.selectedQuantity,
        [Validators.required, Validators.min(1)],
      ],
      price: [
        this.selectedItem?.price,
        [Validators.required, Validators.min(1)],
      ],
    });
    if (this.items.value.find((c: any) => c.id == this.selectedItem?.id)) {
      this.alertHelperService.showAlertMessage(
        'Already Exists',
        AlertMessageType.Error
      );
      return;
    }
    this.items.push(itemFrom);
    this.selectedItem = null;
  }

  // Remove a product from the FormArray
  removeItem(index: number) {
    this.items.removeAt(index);
  }
  getValue(item: any) {
    let price =
      Number(item.get('unitPrice').value) *
      Number(item.get('selectedQuantity').value);
    item?.get('price')?.setValue(price);

    let totalPrice = 0;
    for (let index = 0; index < this.items.value.length; index++) {
      const element = this.items.value[index];
      totalPrice += element.price;
    }
    this.invoiceForm.get('totalPrice')?.setValue(totalPrice);
  }
  // Submit the form and log the values
  submitForm() {
    if(this.data){
      this.invoiceService.updateInvoice(this.invoiceForm.value).subscribe(res=>{
        if(res.succeeded){
          this.alertHelperService.showAlertMessage("Invoice Has Been Successfully Updated",AlertMessageType.Success);
          this.dialog.closeAll();
        }else{
          this.alertHelperService.showAlertMessage(res.messages.join('\n'),AlertMessageType.Error)
        }
      },err=>{
        this.alertHelperService.showAlertMessage(err,AlertMessageType.Error)
      })
    }else{
      this.invoiceService.createInvoice(this.invoiceForm.value).subscribe(res=>{
        if(res.succeeded){
          this.alertHelperService.showAlertMessage("Invoice Has Been Successfully Added",AlertMessageType.Success);
          this.dialog.closeAll();
        }else{
          this.alertHelperService.showAlertMessage(res.messages.join('\n'),AlertMessageType.Error)
        }
      },err=>{
        this.alertHelperService.showAlertMessage(err,AlertMessageType.Error)
      })
    }
  }
  onReset() {
    this.invoiceForm.reset();
    this.dialog.closeAll();
  }
}
