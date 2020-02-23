import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';






@Injectable()
export class LookUpService {

    // look up data files.
    private AssessementAnswer = "../../assets/lookup_database/cso_tra_dbo_lkp_assessment_answer.json";
    private AssessementType = "../../assets/lookup_database/cso_tra_dbo_lkp_assessment_type.json";
    private AssessementTypeSection = "../../assets/lookup_database/cso_tra_dbo_lkp_assessment_type_sector.json";
    private CapacityBuildingType = "../../assets/lookup_database/cso_tra_dbo_lkp_capacity_building_type.json";
    private CsoSector = "../../assets/lookup_database/cso_tra_dbo_lkp_cso_sector.json";
    private CsoType = "../../assets/lookup_database/cso_tra_dbo_lkp_cso_type.json";
    private District = "../../assets/lookup_database/cso_tra_dbo_lkp_district.json";
    private LocalMunicipality = "../../assets/lookup_database/cso_tra_dbo_lkp_local_municipality.json";
    private MemberPosition = "../../assets/lookup_database/cso_tra_dbo_lkp_local_member_position.json";
    private PartnerType = "../../assets/lookup_database/cso_tra_dbo_lkp_partner_type.json";
    private Province = "../../assets/lookup_database/cso_tra_dbo_lkp_province.json";

    constructor(
        public http: HttpClient
    ) { }

    public getAssessementAnswer(): Observable<any> {
        return this.http.get(this.AssessementAnswer)
            .pipe(catchError(this.handleError(<any>("getAssessementAnswer"))));
    }

    public getAssessementType(): Observable<any> {
        return this.http.get(this.AssessementType)
            .pipe(catchError(this.handleError(<any>("getAssessementType"))));
    }
    public getAssessementTypeSection(): Observable<any> {
        return this.http.get(this.AssessementTypeSection)
        .pipe(catchError(this.handleError(<any>("getAssessementTypeSection"))))
    }

    public getCapacityBuildingType(): Observable<any> {
        return this.http.get(this.CapacityBuildingType)
        .pipe(catchError(this.handleError(<any>("getCapacityBuildingType"))))
    }

    public getCsoSector(): Observable<any> {
        return this.http.get(this.CsoSector)
        .pipe(catchError(this.handleError(<any>("getCsoSector"))))
    }

    public getCsoType(): Observable<any> {
        return this.http.get(this.CsoType)
        .pipe(catchError(this.handleError(<any>("getCsoType"))))
    }

    public getDistrict(): Observable<any> {
        return this.http.get(this.District)
        .pipe(catchError(this.handleError(<any>("getDistrict"))))
    }

    public getLocalMunicipality(): Observable<any> {
        return this.http.get(this.LocalMunicipality)
        .pipe(catchError(this.handleError(<any>("getLocalMunicipality"))))
    }

    public getMemberPosition(): Observable<any> {
        return this.http.get(this.MemberPosition)
        .pipe(catchError(this.handleError(<any>("getMemberPosition"))))
    }

    public getPartnerType(): Observable<any> {
        return this.http.get(this.PartnerType)
        .pipe(catchError(this.handleError(<any>("getPartnerType"))))
    }

    public getProvince(): Observable<any> {
        return this.http.get(this.Province)
        .pipe(catchError(this.handleError(<any>("getProvince"))))
    }


    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * 
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.log(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.error(`Api: ${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

}