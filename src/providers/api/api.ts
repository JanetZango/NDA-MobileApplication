import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { ConfigService } from '../config/config.server';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ApiProvider {

  constructor(
    public http: HttpClient,
    public config: ConfigService
    
    ) {

    this.url = config.getApiUrl();
  }

  private url:string;


  public verifyUser( email:string):Observable<any>{
    const url = `${this.url}/user/verifyUser`;
    return this.http.post(url,{user:email},httpOptions);

  }

  public verifyOpt(code:any): Observable<any>{
    const url = `${this.url}/user/otp`;
    return this.http.post(url,{user:code},httpOptions);
  }
}
