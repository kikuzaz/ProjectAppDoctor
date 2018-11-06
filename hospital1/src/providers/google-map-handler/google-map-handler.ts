import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnectionListernerProvider } from '../connection-listerner/connection-listerner';
import { Geolocation } from '@ionic-native/geolocation';


declare var google;
@Injectable()
export class GoogleMapHandlerProvider {
  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  markers: any = [];
  place_service:any;

  apiKey: string="AIzaSyAoDJ4s8Sf-IdZrNNK58PTeTpmSr7KYAjw";

  constructor(public connectivityService: ConnectionListernerProvider,public geolocation: Geolocation) {

  }

  init(mapElement: any, pleaseConnect: any): Promise<any> {

    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.loadGoogleMaps();

  }


  loadGoogleMaps(): Promise<any> {

    return new Promise((resolve) => {

      if (typeof google == "undefined" || typeof google.maps == "undefined") {

        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();

        if (this.connectivityService.isOnline()) {

          window['mapInit'] = () => {

            this.initMap().then(() => {
              resolve(true);
            });

            this.enableMap();
          }

          let script = document.createElement("script");
          script.id = "mapView";

          if (this.apiKey) {
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&libraries=places&callback=mapInit';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
          }

          document.body.appendChild(script);

        }
      }
      else {

        if (this.connectivityService.isOnline()) {
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }

      }

      this.addConnectivityListeners();

    });

  }

  initMap(): Promise<any> {

    this.mapInitialised = true;

    return new Promise((resolve) => {

      this.geolocation.getCurrentPosition().then((position) => {

        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement, mapOptions);
        resolve(true);

      });

    });

  }


  disableMap(): void {

    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "block";
    }

  }


  enableMap(): void {

    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "none";
    }

  }


  addConnectivityListeners(): void {

    document.addEventListener('online', () => {

      console.log("online");

      setTimeout(() => {

        if (typeof google == "undefined" || typeof google.maps == "undefined") {
          this.loadGoogleMaps();
        }
        else {
          if (!this.mapInitialised) {
            this.initMap();
          }

          this.enableMap();
        }

      }, 2000);

    }, false);

    document.addEventListener('offline', () => {

      console.log("offline");

      this.disableMap();

    }, false);

  }

  getNearbyActivities(place_type:string  , user_current_location):void{
 
  let  request = {
    location: user_current_location,
    radius: '500',
    type: [place_type]
  };

  this.place_service = new google.maps.places.PlacesService(this.map);
  this.place_service.nearbySearch(request, this.handleResultsCallback);
}

handleResultsCallback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      this.addMarker(place);
    }
  }

  }

  addMarker(place): void {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: place.geometry.location
    });

    this.markers.push(marker);

}

}
