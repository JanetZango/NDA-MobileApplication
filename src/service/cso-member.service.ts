import {Injectable} from '@angular/core';
import {ConfigService} from "./config.server";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {CsoPayload} from "../model/payload/cso-payload.model";
import {MemberPayload} from "../model/payload/member-payload.model";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({providedIn: 'root'})
export class CsoMemberService {
  private readonly baseUrl: string;

  constructor(public configService: ConfigService, private http: HttpClient) {
    this.baseUrl = this.configService.apiUrl;
  }

  list(cso_guid: string) {
    const url = `${this.baseUrl}/api/secured/cso_member/cso/` + cso_guid;
    return this.http.get(url,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  ListOfCsoMember0(cso_guid: string) {
    const url = `${this.baseUrl}/api/Accounts/getCSOMembers?cos_id=` + cso_guid;
    return this.http.get(url,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }



  get(guid: string) {
    const url = `${this.baseUrl}/api/secured/cso_member/` + guid;
    return this.http.get(url,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  create(member: MemberPayload) {
    const url = `${this.baseUrl}/api/secured/cso_member/create`;
    return this.http.post(url,member,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  
  createNewMember(member: MemberPayload) {
    const url = `${this.baseUrl}/api/Accounts/CSOMember`;
    return this.http.post(url,member,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    return throwError(errorRes);
  }
}
