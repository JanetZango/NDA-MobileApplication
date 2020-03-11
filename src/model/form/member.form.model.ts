export class MemberFormModel {
  private _member_guid: string;
  private _first_name: string;
  private _last_name: string;
  private _member_position_guid: number;
  private _gender: string;
  private _race: string;
  private _passport_number: string
  private _disability: string;
  private _nationality: string
  private _contact_number: string;
  private _rsa_id_number: number;
  private _cso_guid: string;
  private _physical_address: string
  private _end_date: string;
  private _start_date: string;

  constructor() {
  }

  get member_guid(): string {
    return this._member_guid;
  }

  set member_guid(value: string) {
    this._member_guid = value;
  }

  get first_name(): string {
    return this._first_name;
  }

  set first_name(value: string) {
    this._first_name = value;
  }

  get last_name(): string {
    return this._last_name;
  }

  set last_name(value: string) {
    this._last_name = value;
  }

  get member_position_guid(): number {
    return this._member_position_guid;
  }

  set member_position_guid(value: number) {
    this._member_position_guid = value;
  }

  get gender(): string {
    return this._gender;
  }

  set gender(value: string) {
    this._gender = value;
  }

  get race(): string {
    return this._race;
  }

  set race(value: string) {
    this._race = value;
  }

  get passport_number(): string {
    return this._passport_number;
  }

  set passport_number(value: string) {
    this._passport_number = value;
  }

  get disability(): string {
    return this._disability;
  }

  set disability(value: string) {
    this._disability = value;
  }

  get nationality(): string {
    return this._nationality;
  }

  set nationality(value: string) {
    this._nationality = value;
  }

  get contact_number(): string {
    return this._contact_number;
  }

  set contact_number(value: string) {
    this._contact_number = value;
  }

  get rsa_id_number(): number {
    return this._rsa_id_number;
  }

  set rsa_id_number(value: number) {
    this._rsa_id_number = value;
  }

  get cso_guid(): string {
    return this._cso_guid;
  }

  set cso_guid(value: string) {
    this._cso_guid = value;
  }

  get physical_address(): string {
    return this._physical_address;
  }

  set physical_address(value: string) {
    this._physical_address = value;
  }

  get end_date(): string {
    return this._end_date;
  }

  set end_date(value: string) {
    this._end_date = value;
  }

  get start_date(): string {
    return this._start_date;
  }

  set start_date(value: string) {
    this._start_date = value;
  }
}
