import {Injectable} from '@angular/core';
import {ConfigService} from "./config.server";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {MemberPayload} from "../model/payload/member-payload.model";
import {CapacityBuilding} from "../model/capacitybuilding.model";
import {CapacityBuildingPayload} from "../model/payload/capacity-building-payload.model";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({providedIn: 'root'})
export class CapacityBuildingService {
  private readonly baseUrl: string;

  constructor(public configService: ConfigService, private http: HttpClient) {
    this.baseUrl = this.configService.apiUrl;
  }

  list() {
    const url = `${this.baseUrl}/api/secured/capacity_building/`;
    return this.http.get(url,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  
  listofCapacity() {
    const url = `${this.baseUrl}/api/Accounts/getcapacity`;
    return this.http.get(url,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  } 
  get(guid: string) {
    const url = `${this.baseUrl}/api/secured/capacity_building/` + guid;
    return this.http.get(url,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  create(capacityBuilding: CapacityBuildingPayload) {
    const url = `${this.baseUrl}/api/secured/capacity_building/create`;
    return this.http.post(url,capacityBuilding,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  
  createCapacityBuilding(CapacityBuildingPayload: CapacityBuildingPayload) {
    const url = `${this.baseUrl}/api/Accounts/Capacity`;
    return this.http.post(url,CapacityBuildingPayload,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    return throwError(errorRes);
  }
}
