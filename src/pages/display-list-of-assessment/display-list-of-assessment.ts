import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddAssessmentPage } from '../add-assessment/add-assessment';
import { LandingPage } from '../landing/landing';
import { EntityProvider } from '../../providers/entity/cso'

/**
 * Generated class for the DisplayListOfAssessmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-display-list-of-assessment',
  templateUrl: 'display-list-of-assessment.html',
})
export class DisplayListOfAssessmentPage implements OnInit {
  DisplayAssessment = new Array();
  constructor(public navCtrl: NavController, public navParams: NavParams,public csoApi:EntityProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisplayListOfAssessmentPage');
  }
  addBuilding(){
    this.navCtrl.push(AddAssessmentPage);
  }
  gotoback(){
    this.navCtrl.push(LandingPage)
  }

  ngOnInit(){
    this.csoApi.getAssessment().subscribe(res => {
      
      if(res){
        console.log(res.results);
        this.DisplayAssessment = res.results
        console.log(this.DisplayAssessment)
      }

    })


  }

}
