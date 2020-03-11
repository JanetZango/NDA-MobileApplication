import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {LookUpService} from '../../providers/lookup/lookups.service';
import {EntityProvider} from '../../providers/entity/cso';
import {Member} from '../../model/member.model';
import {RsaIdValidator} from "../../providers/validators/rsaid.validator";

@IonicPage()
@Component({
  selector: 'page-add-cso-member',
  templateUrl: 'add-cso-member.html',
})

export class AddCsoMemberPage implements OnInit{
  private cso: string;
  private member: Member;
  private memberForm: FormGroup;
  private defaultRace = "African";
  private defaultGender = "Male";
  private defaultMemberPositionGuid = "2300cae8-0a25-4f50-bf82-aad8fb8a7fd9";
  private defaultNationality = "South African";
  private defaultDisability = "No";
  private showPassportField = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public lookupService: LookUpService,
              public entityProvider: EntityProvider,
              public alertCtrl: AlertController,
              private formBuilder: FormBuilder
  ) {
    this.csoGuid = this.navParams.get('cso_guid');
  }

  ngOnInit(): void {
    this._buildForm()
    this._setPassportNumberValidation()
  }

  _buildForm(){
    this.memberForm = this.formBuilder.group({
      'first_name': ['', [
        Validators.required, Validators.minLength(2), Validators.maxLength(50),
      ]],
      'last_name': ['', [
        Validators.required, Validators.minLength(2), Validators.maxLength(50),
      ]],
      'member_position_guid': [this.defaultMemberPositionGuid, [Validators.required]],
      'gender': [this.defaultGender, [Validators.required]],
      'race': [this.defaultRace, [Validators.required]],
      'nationality': [this.defaultNationality, Validators.compose([Validators.required])],
      'rsa_id_number': ['', [
        Validators.required, RsaIdValidator.isValid,
      ]],
      'passport_number': [''],
      'disability': [this.defaultDisability, Validators.compose([Validators.required])],
      'contact_number': ['', [
        Validators.required, Validators.minLength(9), Validators.maxLength(15),
      ]],
      'physical_address': ['', [
        Validators.required, Validators.minLength(2), Validators.maxLength(50),
      ]],
      'start_date': ['', [Validators.required,Validators]],
      'end_date': ['', [Validators.required,Validators]],
    });
  }

  _setPassportNumberValidation(){
    const passportNumberControl = this.memberForm.get('passport_number');
    const rsaIdNumberControl = this.memberForm.get('rsa_id_number');

    this.memberForm.get('nationality').valueChanges
      .subscribe(nationality => {
        if(nationality === 'Other'){
          passportNumberControl.setValidators([
            Validators.required, Validators.minLength(8), Validators.maxLength(30)
          ]);
          //If passport option, remove from validations from RSA Id number
          rsaIdNumberControl.setValidators(null);
        } else {
          passportNumberControl.setValidators(null);
          rsaIdNumberControl.setValidators([
            Validators.required, RsaIdValidator.isValid
          ]);
        }
        passportNumberControl.updateValueAndValidity();
        rsaIdNumberControl.updateValueAndValidity();
      });
  }

  _isInvalidControl(name: string) {
    return this.memberForm.get(name).invalid && this.memberForm.get(name).dirty;
  }

  goBackToCsoMemberList() {
    this.navCtrl.pop()
  }

  formSubmit(){
    this.member = new Member();
    this.member.first_name = this.memberForm.value.first_name;
    this.member.last_name = this.memberForm.value.last_name;
    this.member.member_position_guid = this.memberForm.value.member_position_guid;
    this.member.gender = this.memberForm.value.gender;
    this.member.race = this.memberForm.value.race;
    this.member.nationality = this.memberForm.value.nationality;
    this.member.passport_number = this.memberForm.value.passport_number;
    this.member.contact_number = this.memberForm.value.contact_number;
    this.member.physical_address = this.memberForm.value.physical_address;
    this.member.start_date = this.memberForm.value.start_date;
    this.member.end_date = this.memberForm.value.end_date;
    this.member.rsa_id_number = this.memberForm.value.rsa_id_number;

    this.entityProvider.saveMembers(this.member).subscribe(_response =>{

      if (_response) {
        const alert = this.alertCtrl.create({
          header: 'Success',
          subHeader: 'Subtitle',
          message: 'This is an alert message.',
          buttons: ['OK']
        });
        alert.present();
      } else {
        console.log("Something went wrong, data input is invalid");
        const alert = this.alertCtrl.create({
          header: 'Error',
          message: 'An error, occurred. Please contact admin for more information.',
          buttons: ['OK']
        });
        alert.present();

      }

    });


    // console.log(csoMember);
    // this.member = new Member(
    //   "",
    //   frm,
    //   formMember.value.last_name,
    //
    //
    //
    // )


    // this.csoMember = csoMember.value
    // this.csoMember.cso_guid = this.cso_guid;
    // // this.validateID();
    // this.phonenumberValidatinservice();
    //
    // if (this.csoMember.rsa_id_number) {
    //   this.csoMember.passport_number = '';
    // }
    //
    // if (!csoMember.valid) {
    //   const alert = this.alertCtrl.create({
    //     title: 'Alert',
    //     subTitle: 'Please complete the form to add a cso member',
    //     buttons: ['OK']
    //   });
    //   alert.present();
    //   // exit the method when the condition are true
    //   return
    // }
    // else if (this.contactValidation = 1) {
    //   const alert = this.alertCtrl.create({
    //     title: 'Alert',
    //     subTitle: 'Please check your number something is wrong',
    //     buttons: ['OK']
    //   });
    //   alert.present();
    //   // exit the method when the condition are true
    //   return
    // }
    // this.entityProvider.saveMembers(this.csoMember).subscribe(response => {
    //   console.log(response)
    //   const alert = this.alertCtrl.create({
    //     title: 'Alert',
    //     subTitle: 'cso member successfully added',
    //     buttons: ['OK']
    //   });
    //   alert.present();
    //
    //   this.reset();
    // }, (err) => {
    //   const alert = this.alertCtrl.create({
    //     title: 'Error!',
    //     subTitle: 'Something went wrong!',
    //     buttons: ['OK']
    //   });
    //   alert.present();
    // });
  }


  //validate id number
  // validateID() {
  //   var cb = document.forms["rsa_id_number"].checked;
  //   let ex: any
  //   if (cb) {
  //     ex = /^(((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\d{4})( |-)(\d{3})|(\d{7}))/;
  //   } else {
  //     ex = /^[0-9]{1,}$/;
  //   }
  //   var theIDnumber = this.authForm.controls["rsa_id_number"]["rsa_id_number"].value;
  //   if (ex.test(theIDnumber) == false) {
  //     const alert = this.alertCtrl.create({
  //       subTitle: 'Please supply a valid ID number',
  //       buttons: ['OK']
  //     });
  //     alert.present();
  //     return false;
  //   }
  //   const alert = this.alertCtrl.create({
  //     subTitle: theIDnumber + ' a valid ID number',
  //     buttons: ['OK']
  //   });
  //   alert.present();
  //
  //   return true;
  // }
}
