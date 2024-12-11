import { Injectable } from '@angular/core';
import { BaseService } from '../../../core/services/base.service';
import { ILogin } from '../models/login.model';
import { IApiResponse } from '../../../core/models/api-response.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILoginOutput } from '../models/login.output.model';
import { jwtDecode } from 'jwt-decode';
import { IUserData } from '../models/user.data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {

  url:string = this.baseUrl('Account');
  userSubject:BehaviorSubject<IUserData|null>= new BehaviorSubject<IUserData | null>(null);;
  constructor() {
    super();
  }

  login(login: ILogin):Observable<IApiResponse<ILoginOutput>>{
    return this._httpClient.post<IApiResponse<ILoginOutput>>(`${this.url}/login`,login)
  }
  public get currentUser(): IUserData | null {
    return this.userSubject.value;
}
  setLoginData(loginOutput:ILoginOutput){
    debugger
    localStorage.setItem('token',loginOutput.token)
    localStorage.setItem('refreshToken',loginOutput.refreshToken);
    localStorage.setItem('refreshTokenExpiryTime',String(loginOutput.refreshTokenExpiryTime));
    let tokenData = jwtDecode(loginOutput.token);
    this.userSubject.next(tokenData as IUserData);
    this.router.navigate(['items'])
  }

  clearLoginData(){
    localStorage.clear();
    this.userSubject.next(null);
    this.router.navigate(['/authentication/login'])
  }
  logout(){
    this.clearLoginData();
  }
  getAccessToken(){
    return localStorage.getItem('token');
  }
}
