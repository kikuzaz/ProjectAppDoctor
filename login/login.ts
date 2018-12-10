import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';

import { RegisLoginPage } from '../regis-login/regis-login';
import { HomePage } from '../home/home';

import {Http, Headers, RequestOptions}  from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild("username") username;
  @ViewChild("password") password;
  data:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
  private http: Http, public loading: LoadingController) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  gotoRegisPage(){
    this.navCtrl.push(RegisLoginPage);
  }

  signIn(){  
    //ตรวจสอบการกรอกข้อมูล
    if(this.username.value==" "){
      let alert = this.alertCtrl.create({
      title:"ATTENTION",
      subTitle:"กรุณากรอกชื่อผู้ใช้",
      buttons: ['OK']
      });
    alert.present();
    } 
    
    else if(this.password.value==" "){
          let alert = this.alertCtrl.create({
          title:"ATTENTION",
          subTitle:"กรุณากรอกรหัสผ่านผู้ใช้",
          buttons: ['OK']
        });
      alert.present();
    }

    else{
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });
      let data = {
        username: this.username.value,
        password: this.password.value
      };
              this.navCtrl.push(HomePage);
            
          };     
      };            
    }            

