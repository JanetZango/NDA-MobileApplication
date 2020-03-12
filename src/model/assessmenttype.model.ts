export class AssessmentType{

    private _guid: string;
    private _title: string;
    
    constructor(){}

    /**
     * Getter guid
     * @return {string}
     */
	public get guid(): string {
		return this._guid;
	}

    /**
     * Getter title
     * @return {string}
     */
	public get title(): string {
		return this._title;
	}

    /**
     * Setter guid
     * @param {string} value
     */
	public set guid(value: string) {
		this._guid = value;
	}

    /**
     * Setter title
     * @param {string} value
     */
	public set title(value: string) {
		this._title = value;
	}

}