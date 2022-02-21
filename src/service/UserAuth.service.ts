import { Injectable } from '@angular/core';
import { ConfigService } from "./config.server";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CsoPayload } from "../model/payload/cso-payload.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class UserAuthService {
    private readonly baseUrl: string;

    constructor(public configService: ConfigService, private http: HttpClient) {
        this.baseUrl = this.configService.apiUrl;
    }

    GetUserDetails(email_address) {
        const url = `${this.baseUrl}/api/Accounts/LoginUser?Username=`+ email_address;
        return this.http.get(url, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        return throwError(errorRes);
    }
}