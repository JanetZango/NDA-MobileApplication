import {CsoSector} from "./csosector.model";
import {CsoType} from "./csotype.model";
import {District} from "./district.model";
import {Province} from "./province.model";
import {Municipality} from "./municipality.model";
import {CsoMobilizationMethod} from "./csomobilizationmethod.model";

export class Cso {
  private _guid:string;
  private _name_of_cso:string;
  private _ward_number:string;
  private _total_staff:string;
  private _registration_number:string;
  private _nda_registration:string;
  private _physical_address:string;
  private _email_address:string;
  private _mobilization_date:string;
  private _contact_number:string;
  private _contact_person:string;
  private _created_at:string;
  private _municipality:Municipality;
  private _cso_sector:CsoSector;
  private _cso_type:CsoType;
  private _province:Province;
  private _district:District;
  private _cso_mobilization_method:CsoMobilizationMethod;

  constructor() {
  }

  get guid(): string {
    return this._guid;
  }

  set guid(value: string) {
    this._guid = value;
  }

  get name_of_cso(): string {
    return this._name_of_cso;
  }

  set name_of_cso(value: string) {
    this._name_of_cso = value;
  }

  get ward_number(): string {
    return this._ward_number;
  }

  set ward_number(value: string) {
    this._ward_number = value;
  }

  get total_staff(): string {
    return this._total_staff;
  }

  set total_staff(value: string) {
    this._total_staff = value;
  }

  get registration_number(): string {
    return this._registration_number;
  }

  set registration_number(value: string) {
    this._registration_number = value;
  }

  get nda_registration(): string {
    return this._nda_registration;
  }

  set nda_registration(value: string) {
    this._nda_registration = value;
  }

  get physical_address(): string {
    return this._physical_address;
  }

  set physical_address(value: string) {
    this._physical_address = value;
  }

  get email_address(): string {
    return this._email_address;
  }

  set email_address(value: string) {
    this._email_address = value;
  }

  get mobilization_date(): string {
    return this._mobilization_date;
  }

  set mobilization_date(value: string) {
    this._mobilization_date = value;
  }

  get contact_number(): string {
    return this._contact_number;
  }

  set contact_number(value: string) {
    this._contact_number = value;
  }

  get contact_person(): string {
    return this._contact_person;
  }

  set contact_person(value: string) {
    this._contact_person = value;
  }

  get created_at(): string {
    return this._created_at;
  }

  set created_at(value: string) {
    this._created_at = value;
  }

  get municipality(): Municipality {
    return this._municipality;
  }

  set municipality(value: Municipality) {
    this._municipality = value;
  }

  get cso_sector(): CsoSector {
    return this._cso_sector;
  }

  set cso_sector(value: CsoSector) {
    this._cso_sector = value;
  }

  get cso_type(): CsoType {
    return this._cso_type;
  }

  set cso_type(value: CsoType) {
    this._cso_type = value;
  }

  get province(): Province {
    return this._province;
  }

  set province(value: Province) {
    this._province = value;
  }

  get district(): District {
    return this._district;
  }

  set district(value: District) {
    this._district = value;
  }

  get cso_mobilization_method(): CsoMobilizationMethod {
    return this._cso_mobilization_method;
  }

  set cso_mobilization_method(value: CsoMobilizationMethod) {
    this._cso_mobilization_method = value;
  }
}
