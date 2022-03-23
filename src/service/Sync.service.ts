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
export class SyncService {
    private readonly baseUrl: string;
  
    constructor(public configService: ConfigService, private http: HttpClient) {
      this.baseUrl = this.configService.apiUrl;
    }
  
   
  
    SyncRegisteredCSO(cso) {
      const url = `${this.baseUrl}/api/Accounts/SyncCSO`;
      return this.http.post(url,cso,httpOptions)
        .pipe(
          catchError(this.handleError)
        );
    }
    SyncRegisteredCSOMember(cso_member) {
        const url = `${this.baseUrl}/api/Accounts/SyncCSOMember`;
        return this.http.post(url,cso_member,httpOptions)
          .pipe(
            catchError(this.handleError)
          );
      }
  
      SyncAssessment(assessment) {
        const url = `${this.baseUrl}/api/Accounts/SyncCSOAssessment`;
        return this.http.post(url,assessment,httpOptions)
          .pipe(
            catchError(this.handleError)
          );
      }
      SynCapacityBuilding(capacity) {
        const url = `${this.baseUrl}/api/Accounts/SyncCSOcapacity`;
        return this.http.post(url,capacity,httpOptions)
          .pipe(
            catchError(this.handleError)
          );
      }
  
  
    private handleError(errorRes: HttpErrorResponse) {
      let errorMessage = 'An unknown error occurred!';
      return throwError(errorRes);
    }
  }
  