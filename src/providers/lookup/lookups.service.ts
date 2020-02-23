import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class LookUpService {

    // look up data files.
    private AssessementAnswer = "../../assets/lookup_database/cso_tra_dbo_lkp_assessment_answer.json";
    private AssessementType  = "../../assets/lookup_database/cso_tra_dbo_lkp_assessment_type.json";

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