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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public lookupService: LookUpService,
    public entityProvider: EntityProvider,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCsoMemberPage');
  }


    /**
   * Get registering cso member
   */
  addCsoMember(csoMember: NgForm){
    this.entityProvider.saveMembers(csoMember.value)
      .subscribe(res =>{
        if(res){
          // cso.reset();
        }else{
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
