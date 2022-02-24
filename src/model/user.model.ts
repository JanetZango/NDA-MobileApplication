export class User {
  public id: string;
  public full_name: string;
  public email: string;
  public province_id: string;
  public verification_token: string;
  // public access_token_expiration_date: Date;
  // public refresh_token: string;
  // public refresh_token_expiration_date: Date;

  constructor(id: string, full_name: string, email: string, province_id: string, verification_token: string) {
    this.id = id;
    this.full_name = full_name;
    this.email = email;
    this.province_id = province_id;
    this.verification_token = verification_token;
    // this.access_token_expiration_date = access_token_expiration_date;
    // this.refresh_token = refresh_token;
    // this.refresh_token_expiration_date = refresh_token_expiration_date;
  }
}
