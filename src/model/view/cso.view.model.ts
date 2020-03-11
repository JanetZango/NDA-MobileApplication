import {CsoSectorViewModel} from "./csosector.view.model";
import {CsoTypeViewModel} from "./csotype.view.model";
import {DistrictViewModel} from "./district.view.model";
import {ProvinceViewModel} from "./province.view.model";
import {MunicipalityViewModel} from "./municipality.view.model";

export class CsoViewModel {
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
  private _municipality:MunicipalityViewModel;
  private _cso_sector:CsoSectorViewModel;
  private _cso_type:CsoTypeViewModel;
  private _province:ProvinceViewModel;
  private _district:DistrictViewModel;

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

  get municipality(): MunicipalityViewModel {
    return this._municipality;
  }

  set municipality(value: MunicipalityViewModel) {
    this._municipality = value;
  }

  get cso_sector(): CsoSectorViewModel {
    return this._cso_sector;
  }

  set cso_sector(value: CsoSectorViewModel) {
    this._cso_sector = value;
  }

  get cso_type(): CsoTypeViewModel {
    return this._cso_type;
  }

  set cso_type(value: CsoTypeViewModel) {
    this._cso_type = value;
  }

  get province(): ProvinceViewModel {
    return this._province;
  }

  set province(value: ProvinceViewModel) {
    this._province = value;
  }

  get district(): DistrictViewModel {
    return this._district;
  }

  set district(value: DistrictViewModel) {
    this._district = value;
  }
}
