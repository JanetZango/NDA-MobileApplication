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
export class NewLookUpService {
  private readonly baseUrl: string;

  constructor(public configService: ConfigService, private http: HttpClient) {
    this.baseUrl = this.configService.apiUrl;
  }

  getCSOType() {
    const url = `${this.baseUrl}/api/Accounts/getCSOType`;
    return this.http.get(url,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  getCSOSector() {
    const url = `${this.baseUrl}/api/Accounts/getCSOsector`;
    return this.http.get(url,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  getDistrictNew() {
    const url = `${this.baseUrl}/api/Accounts/getDistrict`;
    return this.http.get(url,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  getMunicipalitynew(district_id) {
    const url = `${this.baseUrl}/api/Accounts/getmunicipality?district_id=`+ district_id;
    return this.http.get(url,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  getCapacityBuilding() {
    const url = `${this.baseUrl}/api/Accounts/getcapacitybuildingtype`;
    return this.http.get(url,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  getFundingSource() {
    const url = `${this.baseUrl}/api/Accounts/getFundingSource`;
    return this.http.get(url,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  getGetCSOMobilisationMethod() {
    const url = `${this.baseUrl}/api/Accounts/getcsomobilisationmethod`;
    return this.http.get(url,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
 


  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    return throwError(errorRes);
  }
}

  