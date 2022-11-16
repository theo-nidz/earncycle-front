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
  isRoute=false
  routing= L.Routing.control({
    waypoints: [],
    routeWhileDragging: false,
    show:false,
    addWaypoints:false,
    //@ts-ignore
    createMarker: function() { return null; },
    //@ts-ignore
    draggableWaypoints:false
  })

  //  @ts-ignore
  map : L.Map


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

  openFilter(){
    this.modalFilter = true
  }
  closeFilter(){
    this.modalFilter = false
  }

  onMapReady(map: L.Map){
    this.map= map
  }

  routeTo(coord:any) {

		this.routing.setWaypoints([this.userCoord, coord])
	}




  //OnInit, set markers from BDD
  setMarkers(){
    this.loading = true
    const markerCluster = L.markerClusterGroup()
    this._http.get('http://127.0.0.1:8000/api/rubbishes.json?delete=false').subscribe((res:any)=>{

        res.forEach((key:any,index:any) => {
          console.log(key)
          let popupInfo = document.createElement('div')
          popupInfo.className='popup--info'

          let btnGo = document.createElement('button');
          btnGo.className = 'goToBtn';
          btnGo.append(document.createTextNode('S\'y rendre'))
          btnGo.onclick = async () => {
           this.routeTo([key.latitude,key.longitude])
          }
          popupInfo.append(
            document.createTextNode(key.nbStreet + ` `+ key.streetName),
            document.createElement('br'),
            document.createTextNode(key.category.name),
            document.createElement('br'),
            btnGo
            )
            markerCluster.addLayer(L.marker([key.latitude,key.longitude],{icon:this.checkIcon(key.category.name)}).bindPopup(popupInfo));
        });
        this.layers=markerCluster
        this.loading = false
     })
  }

  checkIcon(cat:string){
    var Icon= this.blueBin
    switch(cat){
      case"Autre": Icon = this.userMarker; break;
      case"Verre":  Icon = this.userMarker; break;
      case"Recyclage":  Icon = this.userMarker; break;
      case"Bois":  Icon = this.userMarker; break;
      case"Ordures ménagères":  Icon = this.userMarker; break;
      case"Cartons":  Icon = this.userMarker; break;
      case"Métal":  Icon = this.userMarker; break;
      case"Composte": Icon = this.userMarker; break;
      case"Plastique":  Icon = this.userMarker; break;
      case"Vêtements": Icon = this.userMarker; break;
    }
    return Icon
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
  this.routing.addTo(this.map)

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
