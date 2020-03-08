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
  // observe: 'response'
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
    const url = `${this.url}/api/cso`;
    return this.http.get(url,httpOptions)
      .pipe(catchError(this.handleError(<any>("getCso"))));
  }

  /**
   * Get Capacity Building
   */
  public getCapacityBuilding(): Observable <any> {
    const url = `${this.url}/api/capacity_building/`;
    return this.http.get(url)
      .pipe(catchError(this.handleError(<any>("getCapacityBuilding"))));
  }

  /**
   *  Get Assessment
   */
  public getAssessment(): Observable <any> {
    const url = `${this.url}/api/assessment`;
    return this.http.get(url)
      .pipe(catchError(this.handleError(<any>("getAssessment"))));
  }

   /**
   *  Get cso member
   */

  public getCsoMember(): Observable <any> {
    const url = `${this.url}/api/cso_member`;
    return this.http.get(url)
      .pipe(catchError(this.handleError(<any>("getMember"))));
  }

  /**
   * 
   * @param capacity 
   */
  public saveCapacityBuilding(capacity): Observable<any> {
    const url = `${this.url}/api/capacity_building/create`;
    return this.http.post(url,capacity,httpOptions)
      .pipe(catchError(this.handleError(<any>("saveCapacityBuilding"))));
  }

  /**
   * 
   * @param cso 
   */
  public saveCso(cso): Observable<any> {
    const url = `${this.url}/api/cso/create`;
    return this.http.post(url,cso,httpOptions)
      .pipe(catchError(this.handleError(<any>("saveCso"))));
  }

  /**
   * 
   * @param assessment 
   */
  public saveAssessment(assessment): Observable <any> {
    const assessmentObj = JSON.parse(assessment);
    const url = `${this.url}/api/assessment/create`;
    return this.http.post(url,assessmentObj,httpOptions)
      .pipe(catchError(this.handleError(<any>("saveAssessment"))));
  }

  /**
   * 
   * @param members 
   */
  public saveMembers(members): Observable <any> {
    const url = `${this.url}/api/cso_member/create`;
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