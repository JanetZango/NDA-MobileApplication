import {AssessmentListPayloadModel} from "./assessment-list-payload.model";

export class AssessmentPayloadModel {
  public cso_id: string;
  public assessment_type_id: string;
  public assessment_questions: AssessmentListPayloadModel[];
}
