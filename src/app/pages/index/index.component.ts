import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor() { }

  myIcon = L.icon({
    iconUrl: 'assets/bin.svg',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  })

  options = {
    layers: [
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      L.marker([ 49.46223279984973, 1.134840899469156 ],{icon:this.myIcon})
    ],
    zoom: 20,
    center: L.latLng( 49.46223279984973,1.134840899469156),
  };


  ngOnInit(): void {

  }


}
