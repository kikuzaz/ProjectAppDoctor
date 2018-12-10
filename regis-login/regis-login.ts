import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';


import { LoginPage } from '../login/login';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/**
 * Generated class for the RegisLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regis-login',
  templateUrl: 'regis-login.html',
})
export class RegisLoginPage {
  @ViewChild("username") username;
  @ViewChild("password") password;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
  private http: Http, public loading: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisLoginPage');
  }

  Register(){

    // check to confirm the username, email, telephone and password fields are filled
    if(this.username.value==""){
      let alert = this.alertCtrl.create({    
      title:"กรุณากรอกชื่อผู้ใช้",    
      buttons: ['OK']   
      });    
    alert.present();
    } 
    
    else if(this.password.value==""){
    let alert = this.alertCtrl.create({    
    title:"กรุณากรอกรหัสผ่าน",    
    //subTitle:"กรุณากรอกรหัสผ่าน",    
    buttons: ['OK']    
    });    
    alert.present();    
    }
    
    else {
      var headers = new Headers();    
      headers.append("Accept", 'application/json');    
      headers.append('Content-Type', 'application/json' );    
      let options = new RequestOptions({ headers: headers });    
      let data = {    
        username: this.username.value,    
        password: this.password.value,           
        };
  
                this.navCtrl.push(LoginPage);
           
            };        
      };          
    }          
 


