export class Assessment {
    id: number;
    assessment_type_section_id: number;
    question: string;
    assessment_question_description: string;
    answer_source: string;
    answer_option: string;
    answer_data_type: string;
    modified_by: string;
    modified_date: Date;
    created_by: string;
    created_date: Date;
    question_number: number;
}