import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LandingPage} from '../pages/landing/landing';
import {timer} from 'rxjs/observable/timer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LandingPage;
  showSplash = true;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
  ) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    statusBar.styleDefault();
    splashScreen.hide();
    timer(3000).subscribe(() => this.showSplash = false)
  }
}

