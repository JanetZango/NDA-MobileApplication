import {AssessmentListPayloadModel} from "./assessment-list-payload.model";

export class AssessmentPayloadModel {
  public cso_guid: string;
  public assessment_type_guid: string;
  public assessment_questions: AssessmentListPayloadModel[];
}
