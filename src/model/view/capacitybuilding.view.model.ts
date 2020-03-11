import {CapacityBuildingTypeViewModel} from "./capacitybuildingtype.view.model";
import {DistrictViewModel} from "./district.view.model";
import {MunicipalityViewModel} from "./municipality.view.model";
import {ProvinceViewModel} from "./province.view.model";

export class CapacityBuildingViewModel {
  private _guid: string;
  private _facilitator_name: string;
  private _co_facilitator_name: string;
  private _end_date: string;
  private _start_date: string;
  private _venue: string;
  private _capacity_building_type: CapacityBuildingTypeViewModel;
  private _district: DistrictViewModel;
  private _municipality: MunicipalityViewModel;
  private _province: ProvinceViewModel;

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

  get capacity_building_type(): CapacityBuildingTypeViewModel {
    return this._capacity_building_type;
  }

  set capacity_building_type(value: CapacityBuildingTypeViewModel) {
    this._capacity_building_type = value;
  }

  get district(): DistrictViewModel {
    return this._district;
  }

  set district(value: DistrictViewModel) {
    this._district = value;
  }

  get municipality(): MunicipalityViewModel {
    return this._municipality;
  }

  set municipality(value: MunicipalityViewModel) {
    this._municipality = value;
  }

  get province(): ProvinceViewModel {
    return this._province;
  }

  set province(value: ProvinceViewModel) {
    this._province = value;
  }
}
