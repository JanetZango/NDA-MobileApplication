import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
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
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class ApiProvider {

  constructor(
    public http: HttpClient,
    public config: ConfigService

  ) {

    this.url = config.getApiUrl();
  }

  private url: string;


  public verifyUser(email: string): Observable<any> {
    const url = `${this.url}/user/verifyUser`;
    return this.http.post(url, { "email": email }, httpOptions)
      .pipe(catchError(this.handleError(<any>("verifyUser"))));

  }

  public verifyOpt(code: string): Observable<any> {
    const url = `${this.url}/user/otp`;
    return this.http.post(url, { "otp": code }, httpOptions)
      .pipe(catchError(this.handleError(<any>("verifyOpt"))));
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * 
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.error(`Api: ${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
