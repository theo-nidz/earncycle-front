import { CouponDetailsComponent } from './../coupon-details/coupon-details.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { latLng, tileLayer, Icon, icon, Marker } from "leaflet";
import 'leaflet-routing-machine';
import { RubbishService } from 'src/app/_services/rubbish.service';

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
  userAchievementPopup= false
  errorGeoloc=false
  coins= 0

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


  constructor(private rubbishService: RubbishService) {}
  userAchievement(){
    const coins = Math.floor(Math.random() * (20 - 10) + 10);
    // Add +1 Arbe à user
    this.coins = coins
    this.userAchievementPopup=true
  }
  closeAchievement(){
    this.userAchievementPopup=false
    this.routing.spliceWaypoints(0,2)
    this.map.closePopup()
  }
  //GEOLOCATION
  trackMe() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        let marker:L.Marker<any>[]=[]
        //@ts-ignore
        this.center = new L.latLng(position.coords.latitude, position.coords.longitude)
        marker.push(L.marker([position.coords.latitude,position.coords.longitude],{icon:this.userMarker}))
        this.userPosition = marker
        this.userCoord =  L.latLng(position.coords.latitude, position.coords.longitude)
        this.zoom = 18
      });
    }
  }

  getPosition(){
    navigator.geolocation.watchPosition((position)=>{
      let marker:L.Marker<any>[]=[]
      marker.push(L.marker([position.coords.latitude,position.coords.longitude],{icon:this.userMarker}))
      this.userPosition = marker
      this.userCoord =  L.latLng(position.coords.latitude, position.coords.longitude)
    })
  }
  goUser(){
    this.center = this.userCoord
    this.zoom = 18
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
  getDistanceFromLatLonInKm(lat1:any, lon1:any, lat2:any, lon2:any) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }
  deg2rad(deg:any) {
    return deg * (Math.PI/180)
  }
  routeTo(coord:any) {
		this.routing.setWaypoints([this.userCoord, coord]);
    if(this.getDistanceFromLatLonInKm(this.userCoord.lat,this.userCoord.lng,coord[0],coord[1]) <= 0.030){
      this.userAchievement()
    }else{
      navigator.geolocation.watchPosition((position)=>{
        console.log(this.getDistanceFromLatLonInKm(position.coords.latitude,position.coords.longitude,coord[0],coord[1]))
        if(this.getDistanceFromLatLonInKm(position.coords.latitude,position.coords.longitude,coord[0],coord[1]) <= 0.2){
          this.userAchievement()
        }
       });
    }
	}
  //OnInit, set markers from BDD
  setMarkers(){
    this.loading = true
    const markerCluster = L.markerClusterGroup()
    this.rubbishService.getAllRubbish(true, false).subscribe((res:any)=>{
      console.log(res)
        res.forEach((key:any) => {

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
    var Icon= this.glassBin
    // TODO: change the value name of the category related to the db
    switch(cat){
      case"Autre": Icon = this.otherBin; break;
      case"Verre":  Icon = this.glassBin; break;
      case"Recyclage":  Icon = this.recycleBin; break;
      case"Bois":  Icon = this.woodBin; break;
      case"Ordures ménagères":  Icon = this.wasteBin; break;
      case"Cartons":  Icon = this.cardboardBin; break;
      case"Métal":  Icon = this.metalBin; break;
      case"Composte": Icon = this.compostBin; break;
      case"Plastique":  Icon = this.plasticBin; break;
      case"Vêtements": Icon = this.clothesBin; break;
      default: Icon = this.otherBin; break;
    }
    return Icon
  }

  filter(cat:string){
    this.loading = true
    const markerCluster = L.markerClusterGroup()
    this.rubbishService.getRubbishByCategory(cat, true, false).subscribe((res:any)=>{

      res.forEach((key:any) => {
        // console.log('FOREACH',key)
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
          document.createTextNode(key.type),
          document.createElement('br'),
          btnGo
          )
          markerCluster.addLayer(L.marker([key.latitude,key.longitude],{icon:this.checkIcon(key.category.name)}).bindPopup(popupInfo));
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
  this.routing.addTo(this.map)
  this.getPosition()

  }

//Définir les icons

cardboardBin = L.icon({
  iconUrl: 'assets/images/iconBin/cardboardBin.png',
  iconSize: [30, 30],
  iconAnchor: [20, 25],
})
otherBin = L.icon({
  iconUrl: 'assets/images/iconBin/bin.svg',
  iconSize: [30, 30],
  iconAnchor: [20, 25],
})
clothesBin = L.icon({
  iconUrl: 'assets/images/iconBin/clothesBin.png',
  iconSize: [30, 30],
  iconAnchor: [20, 25],
})
compostBin = L.icon({
  iconUrl: 'assets/images/iconBin/compostBin.png',
  iconSize: [30, 30],
  iconAnchor: [20, 25],
})
glassBin = L.icon({
  iconUrl: 'assets/images/iconBin/glassBin.png',
  iconSize: [30, 30],
  iconAnchor: [20, 25],
})
metalBin = L.icon({
  iconUrl: 'assets/images/iconBin/metalBin.png',
  iconSize: [30, 30],
  iconAnchor: [20, 25],
})
plasticBin = L.icon({
  iconUrl: 'assets/images/iconBin/plasticBin.png',
  iconSize: [30, 30],
  iconAnchor: [20, 25],
})
recycleBin = L.icon({
  iconUrl: 'assets/images/iconBin/recycleBin.png',
  iconSize: [30, 30],
  iconAnchor: [20, 25],
})
wasteBin = L.icon({
  iconUrl: 'assets/images/iconBin/wasteBin.png',
  iconSize: [30, 30],
  iconAnchor: [20, 25],
})
woodBin = L.icon({
  iconUrl: 'assets/images/iconBin/woodBin.png',
  iconSize: [30, 30],
  iconAnchor: [20, 25],
})
userMarker = L.icon({
  iconUrl: 'assets/images/global/userMarker.png',
  iconSize: [30, 30],
  iconAnchor: [20, 25],

})


}
