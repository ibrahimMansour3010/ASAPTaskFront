import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BaseService {

  private _base:string = environment.url;

  _httpClient = inject(HttpClient);
  router = inject(Router);

  baseUrl(path: string, base?: string) {
    return `${this._base}api/${path}`;
  }
}
