export interface InvoiceDto{
  id?:number,
  items:ItemDetailsDto[],
  totalPrice?:number
}

export interface ItemDetailsDto{
  id?:number,
  name?:string,
  unitPrice?:number,
  availableQuantity?:number,
  selectedQuantity?:number,
  price?:number,
}
