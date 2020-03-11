export class User {
  private _access_token: string;
  private _refresh_token: string;
  private _user_details: string;

  constructor() {
  }


  get access_token(): string {
    return this._access_token;
  }

  set access_token(value: string) {
    this._access_token = value;
  }

  get refresh_token(): string {
    return this._refresh_token;
  }

  set refresh_token(value: string) {
    this._refresh_token = value;
  }

  get user_details(): string {
    return this._user_details;
  }

  set user_details(value: string) {
    this._user_details = value;
  }
}
