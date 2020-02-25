import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LandingPage } from '../pages/landing/landing';
import { DisplayListOfCsoPage } from '../pages/display-list-of-cso/display-list-of-cso';
import { EntityProvider } from '../providers/entity/cso';
import { DataProvider } from '../providers/dataproviders/dataprovider';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage:any = HomePage;
  rootPage:any = LandingPage;

  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public entityProvider: EntityProvider,
    public csoProvider: DataProvider
    ) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.getAllCso();
  }

  // to make sure that when the app load we get all the list of cso, to be to inject on pages
  getAllCso(){
    const that = this;
    this.entityProvider.getCso().subscribe(res => {
      if(res){
        that.csoProvider.listOfCso = res.results;
      }
    });
  }
}

