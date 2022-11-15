import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { latLng, tileLayer, Icon, icon, Marker } from "leaflet";
import 'leaflet-routing-machine';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],

})
export class IndexComponent {

  //data
  loading = false
  lat  = 0
  long = 0
  userPosition = [L.marker([0,0])]
  userCoord= L.latLng(0, 0 )
  rubbishes = {}
  modalFilter= false

  //  @ts-ignore
  map : L.Map

  openFilter(){
    this.modalFilter = true
  }
  closeFilter(){
    this.modalFilter = false
  }

  constructor(private _http:HttpClient) {}

  //GEOLOCATION
  trackMe() {
      navigator.geolocation.getCurrentPosition((position) => {
        let marker:L.Marker<any>[]=[]
        //@ts-ignore
        this.center = new L.latLng(position.coords.latitude, position.coords.longitude)
        marker.push(L.marker([position.coords.latitude,position.coords.longitude],{icon:this.userMarker}))
        this.userPosition = marker
        this.userCoord =  L.latLng(position.coords.latitude, position.coords.longitude)
        console.log(this.userCoord)
        this.zoom = 18
      });
  }

  onMapReady(map: L.Map){

    this.map= map
  }

  routeTo() {
		L.Routing.control({
			waypoints: [this.userCoord, L.latLng(57.6792, 11.949)],
			routeWhileDragging: true,
      show:false,
		}).addTo(this.map);
	}

  //OnInit, set markers from BDD
  setMarkers(){
    this.loading = true
    const markerCluster = L.markerClusterGroup()
    this._http.get('http://127.0.0.1:8000/api/rubbishes.json?delete=false').subscribe((res:any)=>{

        res.forEach((key:any,index:any) => {
          const popupInfo = `
          ${key.nbStreet} <br> ${
            key.nbStreet
          } <br> <button class="edit">Edit</button>
          <br> <button class="delete">Delete</button>
          `;
          switch  (key.category){
          //Other
          //Recycling
          case'/api/categories/9': markerCluster.addLayer(L.marker([key.latitude,key.longitude],{icon:this.blueBin}).bindPopup(popupInfo)); break ;
          //Clothes
          case'/api/categories/8': markerCluster.addLayer(L.marker([key.latitude,key.longitude],{icon:this.blueBin}).bindPopup("<b>"+ key.nbStreet +' '+ key.streetName+"</b><br>"+ key.city +"<br>Poubelle à Vêtements")); break ;
          //Waste
          case'/api/categories/7': markerCluster.addLayer(L.marker([key.latitude,key.longitude],{icon:this.blueBin}).bindPopup("<b>"+ key.nbStreet +' '+ key.streetName+"</b><br>"+ key.city +"<br>Waste")); break ;
          //Wood
          case'/api/categories/6': markerCluster.addLayer(L.marker([key.latitude,key.longitude],{icon:this.blueBin}).bindPopup("<b>"+ key.nbStreet +' '+ key.streetName+"</b><br>"+ key.city +"<br>Poubelle à Bois")); break ;
          //Compost
          case'/api/categories/5': markerCluster.addLayer(L.marker([key.latitude,key.longitude],{icon:this.blueBin}).bindPopup("<b>"+ key.nbStreet +' '+ key.streetName+"</b><br>"+ key.city +"<br>Composte")); break ;
          //Metal
          case'/api/categories/4': markerCluster.addLayer(L.marker([key.latitude,key.longitude],{icon:this.blueBin}).bindPopup("<b>"+ key.nbStreet +' '+ key.streetName+"</b><br>"+ key.city +"<br>Poubelle à Métal")); break ;
          //Cardboard
          case'/api/categories/3': markerCluster.addLayer(L.marker([key.latitude,key.longitude],{icon:this.blueBin}).bindPopup("<b>"+ key.nbStreet +' '+ key.streetName+"</b><br>"+ key.city +"<br>Poubelle à Carton")); break ;
          //Glass
          case'/api/categories/2': markerCluster.addLayer(L.marker([key.latitude,key.longitude],{icon:this.blueBin}).bindPopup("<b>"+ key.nbStreet +' '+ key.streetName+"</b><br>"+ key.city +"<br>Poubelle à Verre")); break ;
          //Plastic
          case'/api/categories/1': markerCluster.addLayer(L.marker([key.latitude,key.longitude],{icon:this.blueBin}).bindPopup("<b>"+ key.nbStreet +' '+ key.streetName+"</b><br>"+ key.city +"<br>Poubelle à Plastique")); break ;
          }
        });
        this.layers=markerCluster
        this.loading = false
     })
  }

  //MAP LEAFLET PARAMS
  layers = L.markerClusterGroup()
  center = L.latLng(49.443232, 1.099971 )
  zoom = 10
  options = {
    zoomControl:false,
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
  };



  //OnInit
  ngAfterViewInit(): void {
  this.setMarkers()
  this.trackMe()


  }

//Définir les icons
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
}
