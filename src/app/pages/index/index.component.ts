import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],

})
export class IndexComponent implements OnInit {
  loading = null

  constructor() {}

  blueBin = L.icon({
    iconUrl: 'assets/bin.svg',
    iconSize: [30, 30],
    iconAnchor: [20, 25],
  })
  userMarker = L.icon({
    iconUrl: 'assets/userMarker.png',
    iconSize: [30, 30],
    iconAnchor: [20, 25],

  })
  //GEOLOCATION
  lat  = 0
  long = 0
  trackMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat= position.coords.latitude
        this.long = position.coords.longitude
        console.log('lat',position.coords.latitude)
        console.log('long',position.coords.longitude)

      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  //MAP LEAFLET
  center = L.latLng(49.4501888, 1.0878976 )
  zoom = 2
  options = {
    zoomControl:false,
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
  };
  layers = [L.marker([ 49.4501888, 1.0878976 ],{icon:this.userMarker}),L.marker([ 49.4501888, 1.0878976 ],{icon:this.blueBin})]
  ngOnInit( ): void {
    this.trackMe()
  }
  ngViewInit(): void {

    //FOREACH POUR MARKERS
    //(MARKERS EN BDD).forEach((hit:object) => {
      // @ts-ignore
     // markers.push(L.marker([ lat, long ]))
    //})
    this.layers = [L.marker([ this.lat, this.long ])]
  }
}
