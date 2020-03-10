import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {NgModel, NgForm, Validators, FormBuilder, FormGroup} from '@angular/forms';
import {LookUpService} from '../../providers/lookup/lookups.service';
import {EntityProvider} from '../../providers/entity/cso';
import {Member} from '../../model/member-class';

/**
 * Generated class for the AddCsoMemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-cso-member',
  templateUrl: 'add-cso-member.html',
})


export class AddCsoMemberPage {
  cso_guid: string;
  nationality;
  csoMember = new Member()
  showPassport: boolean = false;
  showIDNumber: boolean = false;
  first_name;
  last_name;
  member_position_guid;
  gender;
  passport_number;
  contact_number;
  disability;
  rsa_id_number;
  race;
  start_date;
  end_date
  physical_address;
  contactValidation;
  private authForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public lookupService: LookUpService,
              public entityProvider: EntityProvider,
              public alertCtrl: AlertController,
              private fb: FormBuilder
  ) {

    this.cso_guid = this.navParams.get('cso_guid');

    this.authForm = this.fb.group({
      'first_name': ['', Validators.compose([Validators.required])],
      'last_name': ['', Validators.compose([Validators.required])],
      'member_position_guid': ['', Validators.compose([Validators.required])],
      'gender': ['', Validators.compose([Validators.required])],
      'race': ['', Validators.compose([Validators.required])],
      'nationality': ['', Validators.compose([Validators.required])],
      'rsa_id_number': ['', Validators.compose([Validators.required])],
      'disability': ['', Validators.compose([Validators.required])],
      'contact_number': ['', Validators.compose([Validators.required])],
      'physical_address': ['', Validators.compose([Validators.required])],
      'start_date': ['', Validators.compose()],
      'end_date': ['', Validators.compose()],

    });

    // this.validateID();
  }

  ionViewDidLoad() {
    // this.validateID();
  }


  // ** to back to the cso member list
  goBackToCsoMemberList() {
    this.navCtrl.pop()
  }

  //  reset
  reset() {
    this.first_name = "";
    this.last_name = "";
    this.member_position_guid = "";
    this.gender = "";
    this.race = "";
    this.nationality = "";
    this.passport_number = "";
    this.rsa_id_number = "";
    this.disability = "";
    this.contact_number = "";
    this.physical_address = "";
    this.start_date = "";
    this.end_date = "";
  }

  addCsoMember(csoMember: NgForm) {
    this.csoMember = csoMember.value
    this.csoMember.cso_guid = this.cso_guid;
    // this.validateID();
    this.phonenumberValidatinservice();

    if(this.csoMember.rsa_id_number){
      this.csoMember.passport_number = '';
    }

    if (!csoMember.valid) {
      const alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: 'Please complete the form to add a cso member',
        buttons: ['OK']
      });
      alert.present();
      // exit the method when the condition are true
      return
    }
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
    this.entityProvider.saveMembers(this.csoMember).subscribe(response => {
      console.log(response)
      const alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: 'cso member successfully added',
        buttons: ['OK']
      });
      alert.present();

      this.reset();
    }, (err) => {
      const alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'Something went wrong!',
        buttons: ['OK']
      });
      alert.present();
    });
  }


  //validate id number
  validateID() {
    var cb = document.forms["rsa_id_number"].checked;
    let ex: any
    if (cb) {
      ex = /^(((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\d{4})( |-)(\d{3})|(\d{7}))/;
    } else {
      ex = /^[0-9]{1,}$/;
    }
    var theIDnumber = this.authForm.controls["rsa_id_number"]["rsa_id_number"].value;
    if (ex.test(theIDnumber) == false) {
      const alert = this.alertCtrl.create({
        subTitle: 'Please supply a valid ID number',
        buttons: ['OK']
      });
      alert.present();
      return false;
    }
    const alert = this.alertCtrl.create({
      subTitle: theIDnumber + ' a valid ID number',
      buttons: ['OK']
    });
    alert.present();

    return true;
  }


  // ** display ID number and Passport
  DisplayNumber() {
    if (this.nationality == "South African") {
      this.showIDNumber = true;
      console.log("show")
    } else {
      this.showIDNumber = false
    }
    if (this.nationality == "Other") {
      this.showPassport = true;
      console.log("show")
    } else {
      this.showPassport = false
    }
  }


  // *validate contact number
  phonenumberValidatinservice() {
    if (this.contact_number == undefined) {
    } else {
      var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
      if (this.contact_number.match(phoneno)) {
        console.log(this.contact_number.match(phoneno));
        this.contactValidation = 0;
      } else {
        this.contactValidation = 1;
        console.log(this.contact_number.match(phoneno));
        console.log("wrong");

      }

    }
  }

}
