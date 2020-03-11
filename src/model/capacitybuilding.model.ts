import {CapacityBuildingType} from "./capacitybuildingtype.model";
import {District} from "./district.model";
import {Municipality} from "./municipality.model";
import {Province} from "./province.model";

export class CapacityBuilding {
  private _guid: string;
  private _facilitator_name: string;
  private _co_facilitator_name: string;
  private _end_date: string;
  private _start_date: string;
  private _venue: string;
  private _capacity_building_type: CapacityBuildingType;
  private _district: District;
  private _municipality: Municipality;
  private _province: Province;

  constructor() {
  }

  get guid(): string {
    return this._guid;
  }

  set guid(value: string) {
    this._guid = value;
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

  get venue(): string {
    return this._venue;
  }

  set venue(value: string) {
    this._venue = value;
  }

  get capacity_building_type(): CapacityBuildingType {
    return this._capacity_building_type;
  }

  set capacity_building_type(value: CapacityBuildingType) {
    this._capacity_building_type = value;
  }

  get district(): District {
    return this._district;
  }

  set district(value: District) {
    this._district = value;
  }

  get municipality(): Municipality {
    return this._municipality;
  }

  set municipality(value: Municipality) {
    this._municipality = value;
  }

  get province(): Province {
    return this._province;
  }

  set province(value: Province) {
    this._province = value;
  }
}
