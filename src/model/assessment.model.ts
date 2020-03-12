import {AssessmentType} from "./assessmenttype.model";
import {Cso} from "./cso.model";

export class Assessment {
  private _assessment_completed: string;
  private _assessment_date: string;
  private _calculate_assessment_level: string;
  private _calculate_assessment_score: string;
  private _assessment_type: AssessmentType;
  private _cso: Cso;

  constructor() {
  }

  get assessment_completed(): string {
    return this._assessment_completed;
  }

  set assessment_completed(value: string) {
    this._assessment_completed = value;
  }

  get assessment_date(): string {
    return this._assessment_date;
  }

  set assessment_date(value: string) {
    this._assessment_date = value;
  }

  get calculate_assessment_level(): string {
    return this._calculate_assessment_level;
  }

  set calculate_assessment_level(value: string) {
    this._calculate_assessment_level = value;
  }

  get calculate_assessment_score(): string {
    return this._calculate_assessment_score;
  }

  set calculate_assessment_score(value: string) {
    this._calculate_assessment_score = value;
  }

  get assessment_type(): AssessmentType {
    return this._assessment_type;
  }

  set assessment_type(value: AssessmentType) {
    this._assessment_type = value;
  }

  get cso(): Cso {
    return this._cso;
  }

  set cso(value: Cso) {
    this._cso = value;
  }
}
