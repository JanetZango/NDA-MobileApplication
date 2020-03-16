import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Storage} from '@ionic/storage';
import {User} from "../model/user.model";
import {UserService} from "./user.service";

@Injectable({providedIn: 'root'})
export class AuthInterceptorService implements HttpInterceptor {
  authUser: User;

  constructor(public userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("user service");
    console.log(this.userService);
    if (req.url.includes('secured') || req.url.includes('refresh')) {
      if (req.url.includes('secured')) {
        const modifiedRequest = req.clone({
          setHeaders: {
            'Access-Control-Allow-Origin': '*',
            'No-Auth':'True',
            'Access-Control-Allow-Credentials':'true',
            'withCredentials': 'true',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Authorization': `Bearer ${this.userService.access_token}`
          }
        });
        console.log("Headers");
        console.log(modifiedRequest);
        return next.handle(modifiedRequest);
      } else if (req.url.includes('refresh')) {
        const modifiedRequest = req.clone({
          setHeaders: {
            'Authorization': `Bearer ${this.userService.refresh_token}`
          }
        });
        return next.handle(modifiedRequest);
      }
    } else {
      return next.handle(req);
    }
  }
}
