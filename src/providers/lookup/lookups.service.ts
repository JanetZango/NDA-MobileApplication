import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as AssessementAnswer from "../../assets/lookup_database/cso_tra_dbo_lkp_assessment_answer.json";
import * as AssessementType from "../../assets/lookup_database/cso_tra_dbo_lkp_assessment_type.json";
import * as AssessementTypeSection from "../../assets/lookup_database/cso_tra_dbo_lkp_assessment_type_sector";
import * as CapacityBuildingType from "../../assets/lookup_database/cso_tra_dbo_lkp_capacity_building";
import * as CsoSector from "../../assets/lookup_database/cso_tra_dbo_lkp_cso_sector";
import * as CsoType from "../../assets/lookup_database/cso_tra_dbo_lkp_cso_type";
import * as District from "../../assets/lookup_database/cso_tra_dbo_lkp_district";
import * as LocalMunicipality from "../../assets/lookup_database/cso_tra_dbo_lkp_local_municipality";
import * as MemberPosition from "../../assets/lookup_database/cso_tra_dbo_lkp_local_member_position";
import * as PartnerType from "../../assets/lookup_database/cso_tra_dbo_lkp_local_partner_type";
import * as Province from "../../assets/lookup_database/cso_tra_dbo_lkp_local_province";



import { Observable } from 'rxjs/Observable';


@Injectable()
export class LookUpService {

    constructor(
        public http: HttpClient
    ) { }

    public getAssessementAnswer(): Observable<any> {
        return this.http.get(AssessementAnswer);
    }

    public getAssessementType(): Observable<any> {
        return this.http.get(AssessementType);
    }
    public getAssessementTypeSection(): Observable<any> {
        return this.http.get(AssessementTypeSection);
    }

    public getCapacityBuildingType(): Observable<any> {
        return this.http.get(CapacityBuildingType);
    }

    public getCsoSector(): Observable<any> {
        return this.http.get(CsoSector);
    }

    public getCsoType(): Observable<any> {
        return this.http.get(CsoType);
    }

    public getDistrict(): Observable<any> {
        return this.http.get(District);
    }

    public getLocalMunicipality(): Observable<any> {
        return this.http.get(LocalMunicipality);
    }

    public getMemberPosition(): Observable<any> {
        return this.http.get(MemberPosition);
    }
    
    public getPartnerType(): Observable<any> {
        return this.http.get(PartnerType);
    }
    
    public getProvince(): Observable<any> {
        return this.http.get(Province);
    }




}