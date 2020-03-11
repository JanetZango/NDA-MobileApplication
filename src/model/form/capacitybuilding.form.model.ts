export class CapacitybuildingFormModel {
  private _municipality_guid: string;
  private _capacity_building_type_guid: string;
  private _funding_source_guid: string;
  private _facilitator_name: string;
  private _co_facilitator_name: string;
  private _partner_guid: string;
  private _venue: string;
  private _start_date: string;
  private _end_date: string;

  constructor() {
  }

  get municipality_guid(): string {
    return this._municipality_guid;
  }

  set municipality_guid(value: string) {
    this._municipality_guid = value;
  }

  get capacity_building_type_guid(): string {
    return this._capacity_building_type_guid;
  }

  set capacity_building_type_guid(value: string) {
    this._capacity_building_type_guid = value;
  }

  get funding_source_guid(): string {
    return this._funding_source_guid;
  }

  set funding_source_guid(value: string) {
    this._funding_source_guid = value;
  }

  get facilitator_name(): string {
    return this._facilitator_name;
  }

  set facilitator_name(value: string) {
    this._facilitator_name = value;
  }

  get co_facilitator_name(): string {
    return this._co_facilitator_name;
  }

  set co_facilitator_name(value: string) {
    this._co_facilitator_name = value;
  }

  get partner_guid(): string {
    return this._partner_guid;
  }

  set partner_guid(value: string) {
    this._partner_guid = value;
  }

  get venue(): string {
    return this._venue;
  }

  set venue(value: string) {
    this._venue = value;
  }

  get start_date(): string {
    return this._start_date;
  }

  set start_date(value: string) {
    this._start_date = value;
  }

  get end_date(): string {
    return this._end_date;
  }

  set end_date(value: string) {
    this._end_date = value;
  }
}
