import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {LookUpService} from '../../providers/lookup/lookups.service';
import {EntityProvider} from '../../providers/entity/cso';
import {Storage} from '@ionic/storage';
import {RsaIdValidator} from "../../providers/validators/rsaid.validator";
import {Cso} from "../../model/cso.model";
import {DisplayCsoMemberListPage} from "../display-cso-member-list/display-cso-member-list";
import {MemberPayload} from "../../model/payload/memberpayload.model";
import {LandingPage} from "../landing/landing";
import {LoginPage} from "../login/login";
import {CsoMemberService} from "../../service/cso-member.service";

@IonicPage()
@Component({
  selector: 'page-add-cso-member',
  templateUrl: 'add-cso-member.html',
})

export class AddCsoMemberPage implements OnInit {
  private cso: Cso;
  private memberPayload: MemberPayload;
  private memberForm: FormGroup;
  private defaultRace = "African";
  private defaultGender = "Male";
  private defaultMemberPositionGuid = "2300cae8-0a25-4f50-bf82-aad8fb8a7fd9";
  private defaultNationality = "South African";
  private defaultDisability = "No";
  private showPassportField = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public lookupService: LookUpService,
    public csoMemberService: CsoMemberService,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    public  storage: Storage,
    public loadingCtrl: LoadingController
  ) {
  }

  ngOnInit(): void {
    this.storage.get('current_cso').then((entity) => {
      this.cso = entity;
    });
    this._buildForm();
    this._setPassportNumberValidation();
  }

  _buildForm() {
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
        Validators.required, Validators.minLength(2), Validators.maxLength(100),
      ]],
      'start_date': ['', [Validators.required, Validators]],
      'end_date': ['', [Validators.required, Validators]],
    });
  }

  _setPassportNumberValidation() {
    const passportNumberControl = this.memberForm.get('passport_number');
    const rsaIdNumberControl = this.memberForm.get('rsa_id_number');

    this.memberForm.get('nationality').valueChanges
      .subscribe(nationality => {
        if (nationality === 'Other') {
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

  redirectToMemberList() {
    this.navCtrl.push(DisplayCsoMemberListPage)
  }

  formSubmit() {
    this.memberPayload = new MemberPayload();
    this.memberPayload.first_name = this.memberForm.value.first_name;
    this.memberPayload.last_name = this.memberForm.value.last_name;
    this.memberPayload.member_position_guid = this.memberForm.value.member_position_guid;
    this.memberPayload.gender = this.memberForm.value.gender;
    this.memberPayload.race = this.memberForm.value.race;
    this.memberPayload.nationality = this.memberForm.value.nationality;
    this.memberPayload.disability = this.memberForm.value.disability;
    this.memberPayload.passport_number = this.memberForm.value.passport_number;
    this.memberPayload.contact_number = this.memberForm.value.contact_number;
    this.memberPayload.physical_address = this.memberForm.value.physical_address;
    this.memberPayload.start_date = this.memberForm.value.start_date;
    this.memberPayload.end_date = this.memberForm.value.end_date;
    this.memberPayload.rsa_id_number = this.memberForm.value.rsa_id_number;
    this.memberPayload.cso_guid = this.cso.guid

    const _loader = this.loadingCtrl.create({
      content: "Please wait whilst we create cso member...",
      duration: 300000000
    });

    _loader.present();

    this.csoMemberService.create(this.memberPayload).subscribe((_response: any) => {
      _loader.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: 'CSO member was added successfully.',
        buttons: ['OK']
      });
      alert.present();
      return this.redirectToMemberList();
    }, _error => {
      _loader.dismiss();
      if (_error.status === 400) {
        const alert = this.alertCtrl.create({
          title: 'Oops',
          subTitle: 'You have entered invalid details, please check your form inputs.',
          buttons: ['OK']
        });
        alert.present();
      } else {
        const alert = this.alertCtrl.create({
          title: 'Oops',
          subTitle: 'Something went wrong, please contact administrator.',
          buttons: ['OK']
        });
        alert.present();
      }
    });



  }

  goBackToHomePage() {
    this.navCtrl.push(LandingPage)
  }

  logout() {
    let alert = this.alertCtrl.create({
      title: 'Logout',
      message: 'You are about to logout, do you want to proceed?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Logout',
          handler: () => {
            this.storage.remove('authUser').then(removed => {
              this.navCtrl.push(LoginPage);
            });
          }
        }
      ]
    });
    alert.present();
  }

  goBack() {
    this.navCtrl.pop();
  }
}
