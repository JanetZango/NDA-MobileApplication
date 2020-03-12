export class Partner {
  private _guid: string;
  private _partner_name: string;

  constructor() {
  }


  get guid(): string {
    return this._guid;
  }

  set guid(value: string) {
    this._guid = value;
  }

  get partner_name(): string {
    return this._partner_name;
  }

  set partner_name(value: string) {
    this._partner_name = value;
  }
}
