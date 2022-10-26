import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor() { }

  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      L.marker([ 49.46223279984973, 1.134840899469156 ])
    ],
    zoom: 20,
    center: L.latLng( 49.46223279984973,1.134840899469156)
  };


  ngOnInit(): void {

  }


}
