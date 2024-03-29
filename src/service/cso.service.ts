import {Injectable} from '@angular/core';
import {ConfigService} from "./config.server";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {CsoPayload} from "../model/payload/cso-payload.model";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({providedIn: 'root'})
export class CsoService {
  private readonly baseUrl: string;

  constructor(public configService: ConfigService, private http: HttpClient) {
    this.baseUrl = this.configService.apiUrl;
  }

  list() {
    const url = `${this.baseUrl}/api/secured/cso/`;
    return this.http.get(url,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  

  get(guid: string) {
    const url = `${this.baseUrl}/api/secured/cso/` + guid;
    return this.http.get(url,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getListOfCSO() {
    const url = `${this.baseUrl}/api/Accounts/getCSOs`;
    return this.http.get(url,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  create(cso: CsoPayload) {
    const url = `${this.baseUrl}/api/secured/cso/create`;
    return this.http.post(url,cso,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  createCso(CsoPayload: CsoPayload) {
    console.log(CsoPayload)
    const url = `${this.baseUrl}/api/Accounts/RegisterCSO`;
    return this.http.post(url,CsoPayload,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    return throwError(errorRes);
  }
}
