import { ResponsePaginated } from "./api-response-pagination.model";

export interface IApiResponse<T> {
  data: T;
  messages: Array<IApiMessagesResponse>;
  httpCode: number;
  succeeded: boolean;
}


export interface IApiMessagesResponse {
  errorCode: number;
  message: string;
}


export interface IApiResponsePaginated<T>{
  data: ResponsePaginated<T>;
  messages: Array<IApiMessagesResponse>;
  httpCode: number;
  succeeded: boolean;
}
