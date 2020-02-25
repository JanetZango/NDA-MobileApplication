import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { NgModel, NgForm } from '@angular/forms';
import { LookUpService } from '../../providers/lookup/lookups.service';
import { EntityProvider } from '../../providers/entity/cso';
import { Member } from '../../model/member-class';
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

  cso_uuid:string;
  csoObj: any;
  csoMember = new Member()

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public lookupService: LookUpService,
    public entityProvider: EntityProvider,    
    public alertCtrl: AlertController,
    ) {

      
      this.csoObj =  this.navParams.get('orgObject');
      this.cso_uuid = this.csoObj.cso_uuid;
  }

  ionViewDidLoad() {
  }


  // ** to back to the cso member list
  goBackToCsoMemberList(){
    this.navCtrl.pop()
  }

    /**
   * Get registering cso member
   * @param csoMember
   */
  addCsoMember(csoMember: NgForm){

    this.csoMember = csoMember.value
    this.csoMember.cso_uuid = this.cso_uuid;
    this.entityProvider.saveMembers(this.csoMember)
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
