import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LandingPage } from '../pages/landing/landing';
import { DisplayListOfCsoPage } from '../pages/display-list-of-cso/display-list-of-cso';
import { EntityProvider } from '../providers/entity/cso';
import { DataProvider } from '../providers/dataproviders/dataprovider';
import { timer } from 'rxjs/observable/timer';
import { LoginPage } from '../pages/login/login';
import {AddCsoMemberPage} from "../pages/add-cso-member/add-cso-member";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = LandingPage;
  //rootPage:any = LoginPage;
  rootPage:any = AddCsoMemberPage;
  showSplash = true;
  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    ) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    //this.getAllCso();
    statusBar.styleDefault();
    splashScreen.hide();
    timer(3000).subscribe(() => this.showSplash = false)
  }
}

