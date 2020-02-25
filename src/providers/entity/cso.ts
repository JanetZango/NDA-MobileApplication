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
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
 
};

@Injectable()
export class EntityProvider {

  constructor(
    public http: HttpClient,
    public config: ConfigService

  ) {
    this.url = config.getApiUrl();
  }

  // back end url
  private url: string;
  /**
   * Get Cso
   */
  public getCso(): Observable <any> {
    const url = `${this.url}/cso`;
    console.log(url)
    return this.http.get(url)
   
      .pipe(catchError(this.handleError(<any>("getCso"))));
  }

  /**
   * Get Capacity Building
   */
  public getCapacityBuilding(): Observable <any> {
    const url = `${this.url}/capacity_building`;
    return this.http.get(url)
      .pipe(catchError(this.handleError(<any>("getCapacityBuilding"))));
  }

  /**
   *  Get Assessment
   */
  public getAssessment(): Observable <any> {
    const url = `${this.url}/assessment`;
    return this.http.get(url)
      .pipe(catchError(this.handleError(<any>("getAssessment"))));
  }

  /**
   * 
   * Get Members By CsoId
   */
  public getMembersByCsoId(){

  }

  /**
   * 
   * @param capacity 
   */
  public saveCapacityBuilding(capacity): Observable<any> {
    const url = `${this.url}/capacity_building`;
    debugger
    return this.http.post(url,capacity,httpOptions)
      .pipe(catchError(this.handleError(<any>("saveCapacityBuilding"))));
  }

  /**
   * 
   * @param cso 
   */
  public saveCso(cso): Observable<any> {
    const url = `${this.url}/cso`;
    return this.http.post(url,cso,httpOptions)
      .pipe(catchError(this.handleError(<any>("saveCso"))));
  }

  /**
   * 
   * @param assessment 
   */
  public saveAssessment(assessment): Observable <any> {
    debugger
    const url = `${this.url}/assessment`;
    return this.http.post(url,assessment,httpOptions)
      .pipe(catchError(this.handleError(<any>("getAssessment"))));
  }

  /**
   * 
   * @param members 
   */
  public saveMembers(members): Observable <any> {
    const url = `${this.url}/members`;
    return this.http.post(url,members,httpOptions)
      .pipe(catchError(this.handleError(<any>("getCsoMembers"))));
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