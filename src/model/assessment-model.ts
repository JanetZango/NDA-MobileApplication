import { AssessmentType } from "./assessmenttype.model";
import { Cso } from "./cso.model";

export class Assessment {

    private _assessment_completed: string;
    private _assessment_date: Date;
    private _assessment_type: AssessmentType;
    private _cso:Cso;

    constructor() {
    }


    /**
     * Getter assessment_completed
     * @return {string}
     */
	public get assessment_completed(): string {
		return this._assessment_completed;
	}

    /**
     * Getter assessment_date
     * @return {Date}
     */
	public get assessment_date(): Date {
		return this._assessment_date;
	}

    /**
     * Getter assessment_type
     * @return {AssessmentType}
     */
	public get assessment_type(): AssessmentType {
		return this._assessment_type;
	}

    /**
     * Setter assessment_completed
     * @param {string} value
     */
	public set assessment_completed(value: string) {
		this._assessment_completed = value;
	}

    /**
     * Setter assessment_date
     * @param {Date} value
     */
	public set assessment_date(value: Date) {
		this._assessment_date = value;
	}

    /**
     * Setter assessment_type
     * @param {AssessmentType} value
     */
	public set assessment_type(value: AssessmentType) {
		this._assessment_type = value;
    }
    
    /**
     * Getter cso
     * @return {Cso}
     */
	public get cso(): Cso {
		return this._cso;
	}

    /**
     * Setter cso
     * @param {Cso} value
     */
	public set cso(value: Cso) {
		this._cso = value;
	}
    
    
}