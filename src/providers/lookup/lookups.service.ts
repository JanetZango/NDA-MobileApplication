import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()
export class LookUpService {

    private AssessmentAnswer = "./assets/lookup_database/assessment_answer.json";
    private AssessmentQuestion = "./assets/lookup_database/assessment_question.json"
    private AssessmentType = "./assets/lookup_database/assessment_type.json";
    private AssessmentTypeSection = "./assets/lookup_database/assessment_type_section.json";
    private CapacityBuildingType = "./assets/lookup_database/capacity_building_type.json";
    private CsoSector = "./assets/lookup_database/cso_sector.json";
    private CsoType = "./assets/lookup_database/cso_type.json";
    private District = "./assets/lookup_database/district.json";
    private LocalMunicipality = "./assets/lookup_database/municipality.json";
    private MemberPosition = "./assets/lookup_database/member_position_new.json";
    private PartnerType = "./assets/lookup_database/partner_type.json";
    private Province = "./assets/lookup_database/province.json";
    private Mobilisation ="./assets/lookup_database/cso_mobilization_method.json";
    private QuestionAnswer = "./assets/lookup_database/questions_and_answers.json"
    private Partner = "./assets/lookup_database/partner.json";
    private FundingSource = "./assets/lookup_database/funding_source.json";

    constructor(
        public http: HttpClient
    ) { }

    public getAssessementAnswer(): Observable<any> {
        return this.http.get(this.AssessmentAnswer)
            .pipe(catchError(this.handleError(<any>("getAssessmentAnswer"))));
    }

    public getAssessementType(): Observable<any> {
        return this.http.get(this.AssessmentType)
            .pipe(catchError(this.handleError(<any>("getAssessmentType"))));
    }
    public getAssessementTypeSection(): Observable<any> {
        return this.http.get(this.AssessmentTypeSection)
        .pipe(catchError(this.handleError(<any>("getAssessmentTypeSection"))));
    }

    public getCapacityBuildingType(): Observable<any> {
        return this.http.get(this.CapacityBuildingType)
        .pipe(catchError(this.handleError(<any>("getCapacityBuildingType"))));
    }

    public getCsoSector(): Observable<any> {
        return this.http.get(this.CsoSector)
        .pipe(catchError(this.handleError(<any>("getCsoSector"))));
    }

    public getCsoType(): Observable<any> {
        return this.http.get(this.CsoType)
        .pipe(catchError(this.handleError(<any>("getCsoType"))));
    }

    public getDistrict(): Observable<any> {
        return this.http.get(this.District)
        .pipe(catchError(this.handleError(<any>("getDistrict"))));
    }

    public getLocalMunicipality(): Observable<any> {
        console.log(this.LocalMunicipality)
        return this.http.get(this.LocalMunicipality)
        .pipe(catchError(this.handleError(<any>("getLocalMunicipality"))));
    }

    public getMemberPosition(): Observable<any> {
        return this.http.get(this.MemberPosition)
        .pipe(catchError(this.handleError(<any>("getMemberPosition"))));
    }

    public getPartnerType(): Observable<any> {
        return this.http.get(this.PartnerType)
        .pipe(catchError(this.handleError(<any>("getPartnerType"))));
    }

    public getProvince(): Observable<any> {
        return this.http.get(this.Province)
        .pipe(catchError(this.handleError(<any>("getProvince"))));
    }

    public getAssessmentQuestion(): Observable<any>{
        return this.http.get(this.AssessmentQuestion)
        .pipe(catchError(this.handleError(<any>("getAssessmentQuestion"))));
    }

    public getMobilisationMethod(): Observable<any>{
        return this.http.get(this.Mobilisation)
        .pipe(catchError(this.handleError(<any>("getMobilisationMethod"))));
    }

    public getQuestionAnswer(): Observable<any>{
        return this.http.get(this.QuestionAnswer)
        .pipe(catchError(this.handleError(<any>("getQuestionAnswer"))));
    }

    public getPartner():Observable<any>{

        return this.http.get(this.Partner)
        .pipe(catchError(this.handleError(<any>("getQuestionAnswer"))));
    }

  public getFundingSource():Observable<any>{
    return this.http.get(this.FundingSource)
      .pipe(catchError(this.handleError(<any>("getFundingSource"))));
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
