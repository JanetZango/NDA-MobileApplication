import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { NgModel, NgForm } from '@angular/forms';
import { LookUpService } from '../../providers/lookup/lookups.service';
import { EntityProvider } from '../../providers/entity/cso';
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

  cso_uuid;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public lookupService: LookUpService,
    public entityProvider: EntityProvider,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.CsoDetailsArr.push(this.navParams.get('orgObject'));
    console.log(this.CsoDetailsArr)
    this.cso_uuid = this.CsoDetailsArr[0].cso_uuid
    console.log(this.cso_uuid)
  }

  // ** go to back to the cso member list
  goBackToCsoMemberList(){
    this.navCtrl.pop();
  }


    /**
   * Get registering cso member
   */
  addCsoMember(csomember: NgForm){
    this.entityProvider.saveMembers(csomember.value)
      .subscribe(res =>{
        if(res){
          // cso.reset();
        // }else{
          const alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: 'cso registered',
            buttons: ['OK']
          });
          alert.present();
        }
      });
  }

}
