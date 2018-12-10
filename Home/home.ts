import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SymptomPage } from '../symptom/symptom';
import { EmergencyPage } from '../emergency/emergency';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }
  
  GotoMenu1(){
    this.navCtrl.push(SymptomPage);
  }

  GotoMenu2(){
    this.navCtrl.push(EmergencyPage);
  }

  GotoMenu3(){
    this.navCtrl.push(AboutPage);
  }
}
