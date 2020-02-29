import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpAuthInterceptor } from "./httpauthinterceptor";

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true }
  ];