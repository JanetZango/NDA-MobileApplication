import {FormControl} from "@angular/forms";

export class RsaIdValidator {

  static isValid(formControl: FormControl) {
    const regex = /^(((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\d{4})( |-)(\d{3})|(\d{7}))/;

    if (regex.test(formControl.value)) {
      return null;
    }
    return {'invalidRsaIdNumber': true}
  }
}
