export class User {
  private _access_token: string;
  private _refresh_token: string;
  private _full_name: string;

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

  get full_name(): string {
    return this._full_name;
  }

  set full_name(value: string) {
    this._full_name = value;
  }
}
