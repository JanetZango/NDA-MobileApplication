export class CsoFormModel {
  private _municipality_guid: string;
  private _cso_type_guid: string;
  private _cso_sector_guid: string;
  private _registration_number: string;
  private _ward_number: string;
  private _name_of_cso: string;
  private _physical_address: string;
  private _contact_person: string;
  private _email_address: string;
  private _total_staff: string;
  private _contact_number: string;
  private _nda_registration: string;

  constructor() {
  }

  get municipality_guid(): string {
    return this._municipality_guid;
  }

  set municipality_guid(value: string) {
    this._municipality_guid = value;
  }

  get cso_type_guid(): string {
    return this._cso_type_guid;
  }

  set cso_type_guid(value: string) {
    this._cso_type_guid = value;
  }

  get cso_sector_guid(): string {
    return this._cso_sector_guid;
  }

  set cso_sector_guid(value: string) {
    this._cso_sector_guid = value;
  }

  get registration_number(): string {
    return this._registration_number;
  }

  set registration_number(value: string) {
    this._registration_number = value;
  }

  get ward_number(): string {
    return this._ward_number;
  }

  set ward_number(value: string) {
    this._ward_number = value;
  }

  get name_of_cso(): string {
    return this._name_of_cso;
  }

  set name_of_cso(value: string) {
    this._name_of_cso = value;
  }

  get physical_address(): string {
    return this._physical_address;
  }

  set physical_address(value: string) {
    this._physical_address = value;
  }

  get contact_person(): string {
    return this._contact_person;
  }

  set contact_person(value: string) {
    this._contact_person = value;
  }

  get email_address(): string {
    return this._email_address;
  }

  set email_address(value: string) {
    this._email_address = value;
  }

  get total_staff(): string {
    return this._total_staff;
  }

  set total_staff(value: string) {
    this._total_staff = value;
  }

  get contact_number(): string {
    return this._contact_number;
  }

  set contact_number(value: string) {
    this._contact_number = value;
  }

  get nda_registration(): string {
    return this._nda_registration;
  }

  set nda_registration(value: string) {
    this._nda_registration = value;
  }
}
