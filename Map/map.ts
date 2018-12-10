import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: GoogleMap;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad(){
    this.initializeMap();
	}
	
  initializeMap() {
 
    let locationOptions = {timeout: 20000, enableHighAccuracy: true};
 
    navigator.geolocation.getCurrentPosition(
 
        (position) => {
 
            let options = {
              center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
              zoom: 16,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            }
 			
            this.map = new google.maps.Map(document.getElementById("map_canvas"), options);
			
			let marker = new google.maps.Marker({    
				position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
				map: this.map,
				animation: google.maps.Animation.DROP
			});
			
			let content = "<p>คุณอยู่ที่นี่ !</p>";          
			let infoWindow = new google.maps.InfoWindow({
			content: content
			});
			
			google.maps.event.addListener(marker, 'click', () => {
			infoWindow.open(this.map, marker);
			});
			
        },
 
        (error) => {
            console.log(error);
        }, locationOptions
    );
	
}

}
