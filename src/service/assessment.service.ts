import {Injectable} from '@angular/core';
import {ConfigService} from "./config.server";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {AssessmentPayloadModel} from "../model/payload/assessment-payload.model";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({providedIn: 'root'})
export class AssessmentService {
  private readonly baseUrl: string;

  constructor(public configService: ConfigService, private http: HttpClient) {
    this.baseUrl = this.configService.apiUrl;
  }

  list() {
    const url = `${this.baseUrl}/api/secured/assessment/`;
    return this.http.get(url,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  listOOfAssessment() {
    const url = `${this.baseUrl}/api/Accounts/getAssessment`;
    return this.http.get(url,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  get(guid: string) {
    const url = `${this.baseUrl}/api/secured/assessment/` + guid;
    return this.http.get(url,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  create(assessment: AssessmentPayloadModel) {
    const url = `${this.baseUrl}/api/secured/assessment/create`;
    return this.http.post(url,assessment,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  createAssessment(AssessmentPayloadModel: AssessmentPayloadModel) {
    const url = `${this.baseUrl}/api/Accounts/Assessment`;
    return this.http.post(url,AssessmentPayloadModel,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    return throwError(errorRes);
  }
}
