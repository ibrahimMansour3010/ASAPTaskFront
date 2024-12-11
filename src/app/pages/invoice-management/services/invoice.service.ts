import { Injectable } from '@angular/core';
import { IApiResponse, IApiResponsePaginated } from 'src/app/core/models/api-response.model';
import { BaseService } from 'src/app/core/services/base.service';
import { InvoiceDto, ItemDetailsDto } from '../models/invoiceDto.model';
import { Observable } from 'rxjs';
import { InvoiceListDto } from '../models/invoice-listDto';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends BaseService {
  url:string = this.baseUrl('Invoice');
  constructor() {
    super();
   }


   getInvoiceList(pageSize:number,pageNumber:number):Observable<IApiResponsePaginated<InvoiceListDto>>{
    return this._httpClient.get<IApiResponsePaginated<InvoiceListDto>>(`${this.url}/GetInvoiceList?pageSize=${pageSize}&pageNumber=${pageNumber}`);
   }

   getInvoiceLookup():Observable<IApiResponse<any>>{
    return this._httpClient.get<IApiResponse<any>>(`${this.url}/GetInvoiceLookup`);
   }

   getInvoiceForEdit(invoiceNumber:string|undefined):Observable<IApiResponse<InvoiceDto>>{
    return this._httpClient.get<IApiResponse<InvoiceDto>>(`${this.url}/GetInvoiceForEdit?InvoiceNumber=${invoiceNumber}`);
   }

   createInvoice(data:InvoiceDto):Observable<IApiResponse<any>>{
    return this._httpClient.post<IApiResponse<any>>(`${this.url}/CreateInvoice`,data);
   }

   updateInvoice(data:InvoiceDto):Observable<IApiResponse<any>>{
    return this._httpClient.put<IApiResponse<any>>(`${this.url}/UpdateInvoice`,data);
   }
   deleteInvoice(invoiceNumber:string|undefined):Observable<IApiResponse<InvoiceListDto>>{
    return this._httpClient.delete<IApiResponse<InvoiceListDto>>(`${this.url}/DeleteInvoice`,{body:{invoiceNumber:invoiceNumber}});
   }
}
