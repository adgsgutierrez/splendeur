import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  private map: any;
  private mapOptions : any;
  private latitud : number = 4.6097100;
  private longitud : number = -74.0817500;
  private color : string = "#00796B";

  constructor(public navCtrl: NavController) {
    let latLng = new google.maps.LatLng(this.latitud, this.longitud);
    this.mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      streetViewControl: false,
      mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID]
          }, // here´s the array of controls
      disableDefaultUI: true, // a way to quickly hide all controls
      mapTypeControl: true,
      scaleControl: true,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE
      }
    };
  }

  ionViewDidLoad() {
   this.loadMap();
  }


  private loadMap() {
    console.log("Ingreso...");

    this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);

    var cityCircle = new google.maps.Circle({
      strokeColor: this.color,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: this.color,
      fillOpacity: 0.25,
      map: this.map,
      center: new google.maps.LatLng(this.latitud, this.longitud),
      radius: 500
    });
    this.map.setTilt(75);
  }
}
