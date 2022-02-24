export class CapacityBuildingPayload {
  public capacity_building_type_id: number;
  public province_id=1;
  public district_id: number;
  public municipality_id: number;
  public partner_id: number;
  public facilitator_name: string;
  public venue: string;
  public start_date: Date;
  public end_date: Date;
  public co_facilitator_name: string;
  public funding_source_id:number

  constructor() {
  }

  
}
