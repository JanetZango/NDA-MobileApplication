export class AddCSO {
    public cso_type_id: number;
    public cso_sector_id: number;
    public province_id: number;
    public district_id: number;
    public municipality_id: number;
    public ward_number: number;
    public registration_number: string;
    public name_of_cso: string;
    public contact_person: string;
    public physical_address: string;
    public contact_number: string;
    public email_address: string;
    public cso_mobilisation_method_id:number;
    public collected_by=1;
    public modified_by=2;
    public modified_date:Date;
    public created_by=2;
    public created_date:Date;
    public total_staff:number;
  }