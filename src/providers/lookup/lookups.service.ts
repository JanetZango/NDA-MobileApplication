import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as AssessementAnswer from "../../assets/lookup_database/cso_tra_dbo_lkp_assessment_answer.json";
import * as AssessementType from "../../assets/lookup_database/cso_tra_dbo_lkp_assessment_type.json";
import { Observable } from 'rxjs/Observable';


@Injectable()
export class LookUpService {

    constructor(
        public http: HttpClient
        ){}

        public getAssessementAnswer(): Observable<any>{
           return this.http.get(AssessementAnswer);
        }

        public getAssessementType(): Observable<any>{
            return this.http.get(AssessementType);
        }

}