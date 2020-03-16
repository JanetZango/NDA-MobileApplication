import {Injectable} from '@angular/core';
import {ConfigService} from "./config.server";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly baseUrl: string;

  constructor(public configService: ConfigService, private http: HttpClient) {
    this.baseUrl = this.configService.apiUrl;
  }

  login(emailAddress: string) {
    const url = `${this.baseUrl}/api/auth/login`;
    return this.http.post(url, {"email": emailAddress}, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  checkOTP(otp: string) {
    const url = `${this.baseUrl}/api/auth/otp`;
    return this.http.post(url, {"otp": otp}, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    console.log(errorMessage);
    return throwError(errorRes);
  }

}
