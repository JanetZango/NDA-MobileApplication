import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class UserService {
  private _guid?: string;
  private _full_name: string;
  private _email: string;
  private _province_guid: string;
  private _access_token: string;
  private _access_token_expiration_date: Date;
  private _refresh_token: string;
  private _refresh_token_expiration_date: Date;


  constructor() {
  }


  get guid(): string {
    return this._guid;
  }

  set guid(value: string) {
    this._guid = value;
  }

  get full_name(): string {
    return this._full_name;
  }

  set full_name(value: string) {
    this._full_name = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get province_guid(): string {
    return this._province_guid;
  }

  set province_guid(value: string) {
    this._province_guid = value;
  }

  get access_token(): string {
    return this._access_token;
  }

  set access_token(value: string) {
    this._access_token = value;
  }

  get access_token_expiration_date(): Date {
    return this._access_token_expiration_date;
  }

  set access_token_expiration_date(value: Date) {
    this._access_token_expiration_date = value;
  }

  get refresh_token(): string {
    return this._refresh_token;
  }

  set refresh_token(value: string) {
    this._refresh_token = value;
  }

  get refresh_token_expiration_date(): Date {
    return this._refresh_token_expiration_date;
  }

  set refresh_token_expiration_date(value: Date) {
    this._refresh_token_expiration_date = value;
  }

  get isAccessTokenValid() {
    if (this._access_token_expiration_date || new Date() > this._access_token_expiration_date) {
      return false;
    }
    return true;
  }

  get isRefreshTokenValid(){
    if(this._refresh_token_expiration_date || new Date() > this._refresh_token_expiration_date){
      return false;
    }
    return true;
  }
}
