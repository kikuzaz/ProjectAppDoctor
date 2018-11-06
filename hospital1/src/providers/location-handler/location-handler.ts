import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AlertController, ToastController, LoadingController, ActionSheetController } from 'ionic-angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

@Injectable()
export class LocationHandlerProvider {

  data: any;
  public loading: any;

  constructor(public http: HttpClient, public actionSheetCtrl: ActionSheetController,public location:LocationAccuracy,private alert: AlertController, private toast: ToastController, private loader: LoadingController) {


  }


  showLoader(message: string) {

    this.loading = this.loader.create({
      content: message
    });

    this.loading.present();
  }

 
  closeLoader() {

    this.loading.dismiss();
  }


  showToastMessage(message: string, position: string = "bottom", duration: number = 4000, class_name: string = "toast-default") {

    let toast_message = this.toast.create({
      message: message,
      duration: duration,
      position: position,

    });

    toast_message.present();
  }


  showSimpleAlertDialog(title: string = "", msg: string = "") {

    let alert = this.alert.create({
      title: title,
      message: msg,
      buttons: ['OK']
    });
    alert.present();
  }

 enableLocationService(): boolean{
  let enabled=false;
  let alert = this.alert.create({
    title: 'To continue, please you will need to turn on your device location to enable Location Service',
    message: '',
    buttons: [
 
      {
        text: 'Turn On Now',
        handler: () => {

          //show loader
          this.showLoader('Enabling location service, please wait...');
          this.location.canRequest().then((canRequest: boolean) => {

            if(canRequest) {
              // the accuracy option will be ignored by iOS
              this.location.request(this.location.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                () => {
                  console.log('Request successful');
                  enabled=true;
                  this.closeLoader();
                  return enabled;
              
              },
                (error) =>{ 
                  console.log('Error requesting location permissions', error);
                
                  
                }
              );
            }
          
          });
          
        }
 }
],
      });

      alert.present();
      
      return enabled;
    }     
  calculateNearbyPlacesByApplyHaversine(locations:any, usersLocation: any): Array<Object> {
  
    let locations_object: any = locations;
    console.log(locations[0]);

    for (var i = 0; i < locations_object.length; i++) {

      console.log("dengun");
      let placeLocation = {
        lat: locations_object[i].location.latitude,
        lng: locations_object[i].location.longitude
      };

      let distance = this.getDistanceBetweenPoints(
        usersLocation,
        placeLocation,
        'miles'
      ).toFixed(2);

      console.log(distance);
    }

    return locations_object;
  }

 
  getDistanceBetweenPoints(start, end, units) {

    let earthRadius = {
      miles: 3958.8,
      km: 6371
    };

    let R = earthRadius[units || 'miles'];
    let lat1 = start.lat;
    let lon1 = start.lng;
    let lat2 = end.lat;
    let lon2 = end.lng;

    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;

  }

  toRad(x) {
    return x * Math.PI / 180;
  }

showActionSheeet(buttons: Array<any>) {
  buttons.push({
      icon:'close',
      text: 'Cancel',
      role: 'cancel',
  });

let actionSheet = this.actionSheetCtrl.create({
      buttons: buttons
  });

actionSheet.present();
}
}
