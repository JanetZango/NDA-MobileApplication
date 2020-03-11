export class AssessmentAnswer {

    private _answer_guid: string;
    private _question_guid: String;

    constructor() {
    }


    /**
     * Getter answer_guid
     * @return {string}
     */
    public get answer_guid(): string {
        return this._answer_guid;
    }

    /**
     * Getter question_guid
     * @return {String}
     */
    public get question_guid(): String {
        return this._question_guid;
    }

    /**
     * Setter answer_guid
     * @param {string} value
     */
    public set answer_guid(value: string) {
        this._answer_guid = value;
    }

    /**
     * Setter question_guid
     * @param {String} value
     */
    public set question_guid(value: String) {
        this._question_guid = value;
    }

}