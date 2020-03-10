import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { ConfigService } from '../config/config.server';
import { Tokens } from '../../model/tokens';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const JWT_TOKEN = 'JWT_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';

@Injectable()
export class ApiProvider {

  constructor(
    public http: HttpClient,
    public config: ConfigService

  ) {

    this.url = config.getApiUrl();
  }

  private url: string;
  
  //private loggedUser: string;

  /**
   * 
   * @param email 
   */
  public verifyUser(email: string): Observable<any> {
    const url = `${this.url}/api/auth/login`;
    return this.http.post(url, { "email": email }, httpOptions)
      .pipe(catchError(this.handleError(<any>("verifyUser"))));

  }
  /**
   * 
   * @param code 
   */
  public verifyOpt(code: string): Observable<any> {
    const url = `${this.url}/api/auth/otp`;
    return this.http.post(url, { "otp": code }, httpOptions)
      .pipe(
       tap(res => this.doLoginUser(res)),
        catchError(this.handleError(<any>("verifyOpt"))));
     
  }

  refreshToken() {
    return this.http.post<any>(`${this.url}/api/auth/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      console.log(Tokens)
      this.storeJwtToken(tokens.access_token);
      console.log(tokens.access_token)
    }));
  }

  getJwtToken() {
    return localStorage.getItem(JWT_TOKEN);
  }
  /**
   * 
   * @param username 
   * @param tokens 
   */
  private doLoginUser(tokens: any) {
   // this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
   // this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN);
  }
  /**
   * 
   * @param jwt 
   */
  private storeJwtToken(jwt: string) {
    localStorage.setItem(JWT_TOKEN, jwt);
  }
  /**
   * 
   * @param tokens 
   */
  private storeTokens(tokens: Tokens) {
    localStorage.setItem(JWT_TOKEN, tokens.access_token);
    localStorage.setItem(REFRESH_TOKEN, tokens.refresh_token);
  }

  /**
   * 
   */
  private removeTokens() {
    localStorage.removeItem(JWT_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
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
