export class User {
  public guid?: string;
  public full_name: string;
  public email: string;
  public province_guid: string;
  public access_token: string;
  public access_token_expiration_date: Date;
  public refresh_token: string;
  public refresh_token_expiration_date: Date;

  constructor(guid: string, full_name: string, email: string, province_guid: string, access_token: string, access_token_expiration_date: Date, refresh_token: string, refresh_token_expiration_date: Date) {
    this.guid = guid;
    this.full_name = full_name;
    this.email = email;
    this.province_guid = province_guid;
    this.access_token = access_token;
    this.access_token_expiration_date = access_token_expiration_date;
    this.refresh_token = refresh_token;
    this.refresh_token_expiration_date = refresh_token_expiration_date;
  }
}
