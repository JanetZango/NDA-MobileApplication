import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LandingPage} from '../pages/landing/landing';
import {timer} from 'rxjs/observable/timer';
import { AddCsoPage } from '../pages/add-cso/add-cso';
import { AddCsoMemberPage } from '../pages/add-cso-member/add-cso-member';
import { LoginPage } from '../pages/login/login';
import { DisplayListOfCsoPage } from '../pages/display-list-of-cso/display-list-of-cso';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  showSplash = true;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private storage: Storage,
  ) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      this.storage.get('authUser').then((_responseUser) => {
          console.log(_responseUser)
          if (_responseUser != null) {
            this.rootPage = LandingPage
          }
          else {
            this.rootPage = LoginPage
          }
        })
     
    });

    statusBar.styleDefault();
    splashScreen.hide();
    timer(3000).subscribe(() => this.showSplash = false)
  }
}

