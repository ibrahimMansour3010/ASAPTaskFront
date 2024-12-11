import { AlertHelperService } from 'src/app/core/helpers/alert-helper.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemListDto } from '../../models/item-list.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ItemService } from '../../services/item.service';
import { AlertMessageType } from 'src/app/core/enums/alert-message-type';

@Component({
  selector: 'app-manage-item',
  templateUrl: './manage-item.component.html',
  styleUrl: './manage-item.component.scss'
})
export class ManageItemComponent implements OnInit {
  itemForm:FormGroup=new FormGroup({});
  itemDto:ItemListDto = {} ;

  constructor(private dialog:MatDialog,private itemService:ItemService,private alertHelperService:AlertHelperService,
    public dialogRef: MatDialogRef<ManageItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Receiving data passed to dialog
  ){
    if(this.data)
      this.itemDto = this.data;
    this.initializeFrom();
  }

  initializeFrom(){
    this.itemForm = new FormGroup({
      id: new FormControl(this.itemDto.id),
      name: new FormControl(this.itemDto.name,Validators.required),
      description: new FormControl(this.itemDto.description,Validators.required),
      unitPrice: new FormControl(this.itemDto.unitPrice,Validators.compose([
        Validators.required,  // Required validation
        Validators.min(1)     // Minimum value of 1 (greater than 0)
      ])),
      availableQuantity: new FormControl(this.itemDto.availableQuantity,Validators.compose([
        Validators.required,  // Required validation
        Validators.min(1)     // Minimum value of 1 (greater than 0)
      ])),
    })
  }
  ngOnInit(): void {

  }
  onSubmit(){
    if(this.data){
      this.itemService.updateItem(this.itemForm.value).subscribe(res=>{
        if(res.succeeded){
          this.alertHelperService.showAlertMessage("Item Has Been Successfully Updated",AlertMessageType.Success);
          this.dialog.closeAll();
        }else{
          this.alertHelperService.showAlertMessage(res.messages.join('\n'),AlertMessageType.Error)
        }
      },err=>{
        this.alertHelperService.showAlertMessage(err,AlertMessageType.Error)
      })
    }else{
      this.itemService.createItem(this.itemForm.value).subscribe(res=>{
        if(res.succeeded){
          this.alertHelperService.showAlertMessage("Item Has Been Successfully Added",AlertMessageType.Success);
          this.dialog.closeAll();
        }else{
          this.alertHelperService.showAlertMessage(res.messages.join('\n'),AlertMessageType.Error)
        }
      },err=>{
        this.alertHelperService.showAlertMessage(err,AlertMessageType.Error)
      })
    }
  }
  onReset(){
    this.itemForm.reset();
    this.dialog.closeAll();
  }
}
