import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse, IApiResponsePaginated } from 'src/app/core/models/api-response.model';
import { BaseService } from 'src/app/core/services/base.service';
import { ItemListDto } from '../models/item-list.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends BaseService {

  url:string = this.baseUrl('Item');
  constructor() {
    super();
   }

   getItemList(pageSize:number,pageNumber:number):Observable<IApiResponsePaginated<ItemListDto>>{
    return this._httpClient.get<IApiResponsePaginated<ItemListDto>>(`${this.url}/GetItemList?pageSize=${pageSize}&pageNumber=${pageNumber}`);
   }


   createItem(itemDto:ItemListDto):Observable<IApiResponse<number>>{
    return this._httpClient.post<IApiResponse<number>>(`${this.url}/CreateItem`,itemDto);
   }

   updateItem(itemDto:ItemListDto):Observable<IApiResponse<ItemListDto>>{
    return this._httpClient.put<IApiResponse<ItemListDto>>(`${this.url}/UpdateItem`,itemDto);
   }

   deleteItem(itemId:number|undefined):Observable<IApiResponse<ItemListDto>>{
    return this._httpClient.delete<IApiResponse<ItemListDto>>(`${this.url}/DeleteItem`,{body:{id:itemId}});
   }
}
