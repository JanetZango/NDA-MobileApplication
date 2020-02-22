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
export class EntityProvider {

  constructor(
    public http: HttpClient,
    public config: ConfigService
    
    ) {

    this.url = config.getApiUrl();
  }

  private url:string;



  getcso(){
    this.http.get('http://172.18.180.127:5000/cso').subscribe(data =>{
      console.log(data)
    })
  }
}