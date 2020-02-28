import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NgModel, NgForm } from '@angular/forms';
import { LookUpService } from '../../providers/lookup/lookups.service';
import { EntityProvider } from '../../providers/entity/cso';
import { Member } from '../../model/member-class';
import { DisplayCsoMemberListPage } from '../display-cso-member-list/display-cso-member-list';
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
  //array
  CsoDetailsArr = new Array()


  // variables
  cso_uuid: string;
  nationality;
  csoObj: any;
  csoMember = new Member()
  showPassport: boolean = false;
  showIDNumber: boolean = false;
  first_name;
  last_name;
  member_position_id;
  gender;
  passport_number;
  contact_number;
  disability;
  id_number;
  race;
  contactValidation ;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public lookupService: LookUpService,
    public entityProvider: EntityProvider,
    public alertCtrl: AlertController,
  ) {


    this.csoObj = this.navParams.get('orgObject');
    this.cso_uuid = this.csoObj.cso_uuid;
  }

  ionViewDidLoad() {
    // this.validateID();
  }


  // ** to back to the cso member list
  goBackToCsoMemberList() {
    this.navCtrl.pop()
  }

  /**
 * Get registering cso member
 * @param csoMember
 */


  //  reset
  reset() {
    this.first_name = "";
    this.last_name = "";
    this.member_position_id = "";
    this.gender = "";
    this.race = "";
    this.nationality = "";
    this.passport_number = "";
    this.id_number = "";
    this.disability = "";
    this.contact_number = "";
  }

  addCsoMember(csoMember: NgForm) {
    this.csoMember = csoMember.value
    this.csoMember.cso_uuid = this.cso_uuid;
    // this.validateID();
    this.phonenumberValidatinservice();
    this.entityProvider.saveMembers(this.csoMember).subscribe(res => {
      if (this.first_name == "" || this.first_name == null ||
        this.last_name == "" || this.last_name == null ||
        this.member_position_id == "" || this.member_position_id == null ||
        this.gender == "" || this.gender == null ||
        this.race == "" || this.race == null ||
        this.nationality == "" || this.nationality == null ||
        this.id_number == "" || this.id_number == null ||
        this.disability == "" || this.disability == null ||
        this.contact_number == "" || this.disability == null ||
        this.contact_number == "") {
        const alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'Please complete the form to add a cso member',
          buttons: ['OK']
        });
        alert.present();
      }
      else if(this.contactValidation =1){
        const alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'Please check your number something is wrong',
          buttons: ['OK']
        });
        alert.present();
      }
      else if (typeof (res) != 'undefined') {
        const alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'cso member successfully added',
          buttons: ['OK']
        });
        alert.present();
        this.reset();

      }
      else {
        const alert = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'Please enter your details!',
          buttons: ['OK']
        });
        alert.present();
      }
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
    var cb = document.forms["id_number"].checked;
    if (cb) {
      var ex = /^(((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\d{4})( |-)(\d{3})|(\d{7}))/;
    } else {
      var ex = /^[0-9]{1,}$/;
    }
    var theIDnumber = document.forms["id_number"]["idnumber"].value;
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
    }
    else {
      this.showIDNumber = false
    }
    if (this.nationality == "Other") {
      this.showPassport = true;
      console.log("show")
    }
    else {
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
      }
      else {
        this.contactValidation = 1;
        console.log(this.contact_number.match(phoneno));
        console.log("wrong");

      }

    }
  }

}
