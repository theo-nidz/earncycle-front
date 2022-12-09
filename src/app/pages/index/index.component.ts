import { Router } from '@angular/router';
import { CouponDetailsComponent } from './../coupon-details/coupon-details.component';
import { Component, createPlatform,ElementRef, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { TokenStorageService } from 'src/app/_services/token-storage.service'
import { RubbishService } from 'src/app/_services/rubbish.service';
import { UserService } from 'src/app/_services/user.service';
import { ThisReceiver } from '@angular/compiler';

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
  userWallet:number= 0
  userTrees:number= 0
  userId= 0
  rubbishes = {}
  modalFilter= false
  isRoute=false
  userAchievementPopup= false
  userAchievementLogged=false
  errorGeoloc=false
  coins= 0
  filterActive=false
  cancelRoutePopup = false

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
  //  @ts-ignore
  map : L.Map


  constructor(private rubbishService: RubbishService,private tokenservice: TokenStorageService,private userservice: UserService,private Router: Router) {}

  //Traduction Catégorie
  tradCat(name:string): string{
    switch(name){
      case"Other": return "Autre"; break;
      case"Glass":  return "Verre"; break;
      case"Recycling":  return "Recyclage"; break;
      case"Wood":   return "Bois"; break;
      case"Waste":   return "Ordure ménagères"; break;
      case"Cardboard":   return "Cartons"; break;
      case"Metal":  return "Métail"; break;
      case"Compost": return "Composte"; break;
      case"Plastic":   return "Plastique"; break;
      case"Clothes":  return "Vêtements"; break;
      default: return "Non défini"; break;
    }
  }

  // Achievement
   userAchievement(){
    if(window.sessionStorage.getItem('auth-user')){

      //Add coins à user
      const coins:number = Math.floor(Math.random() * (20 - 10) + 10);
      this.coins = coins
      this.userservice.updateUserWallet(this.userId,{'wallet': this.userWallet + coins}).subscribe()
      this.userWallet = (this.userWallet + coins)

      // Add Tree à user
      this.userservice.updateUserTrees(this.userId,{'trees': this.userTrees + 1}).subscribe()
      this.userTrees = (this.userTrees + 1)

      this.userAchievementLogged = true
    }
    this.userAchievementPopup=true
  }
  closeAchievement(){
    this.userAchievementPopup=false
    this.routing.spliceWaypoints(0,2)
    this.map.closePopup()
  }

  //GEOLOCATION
  onMapReady(map: L.Map){
    this.map= map
  }
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
    this.isRoute=true
    if(this.getDistanceFromLatLonInKm(this.userCoord.lat,this.userCoord.lng,coord[0],coord[1]) <= 0.030){
      this.userAchievement()
    }else{
      navigator.geolocation.watchPosition((position)=>{
        if(this.getDistanceFromLatLonInKm(position.coords.latitude,position.coords.longitude,coord[0],coord[1]) <= 0.2 && this.isRoute === true){
          this.userAchievement()
        }
       });
    }
	}
  cancelRoute(){
    this.routing.spliceWaypoints(0,2)
    this.isRoute=false
    this.map.closePopup()
    this.cancelRoutePopup = false
  }
// Cookie
  getCookie(name:string) {
    var cookieArr = document.cookie.split(";");
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if(name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
  }
  checkCookie(){
   if(this.getCookie('intro') === 'false' || !this.getCookie('intro')){
    this.Router.navigate(['intro'])
   }
  }

  // Gestion Menu
  openCancelRoute(){
    this.cancelRoutePopup = true
  }
  closeCancelRoute(){
    this.cancelRoutePopup = false
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


  //OnInit, set markers from BDD
  setMarkers(){
    this.loading = true
    const markerCluster = L.markerClusterGroup()
    this.rubbishService.getAllRubbish(true, false).subscribe((res:any)=>{

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
            document.createTextNode(this.tradCat(key.category.name)),
            document.createElement('br'),
            btnGo
            )
            markerCluster.addLayer(L.marker([key.latitude,key.longitude],{icon:this.checkIcon(key.category.name)}).bindPopup(popupInfo));
        });
        this.layers=markerCluster
        this.loading = false
        this.filterActive = false
     })
  }



  filter(cat:string){
    this.loading = true
    const markerCluster = L.markerClusterGroup()
    this.rubbishService.getRubbishByCategory(cat,true, false).subscribe((res:any)=>{
     
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
            document.createTextNode(this.tradCat(key.category.name)),
            document.createElement('br'),
            btnGo
            )
            markerCluster.addLayer(L.marker([key.latitude,key.longitude],{icon:this.checkIcon(key.category.name)}).bindPopup(popupInfo));
        });
        this.layers=markerCluster
        this.loading = false
        this.filterActive = true
     })
  }

  //OnInit
  ngAfterViewInit(): void {
  this.setMarkers()
  this.trackMe()
  this.routing.addTo(this.map)
  this.getPosition()
  this.checkCookie()

  this.userId = this.tokenservice.getUser().userId;
  if(this.userId != undefined){
    this.userservice.getUserById(this.userId).subscribe({
      next: data => {
        this.userWallet = data.wallet;
        this.userTrees = data.trees;

      }
    });
  }
  }

//Définir les icons
checkIcon(cat:string){
  var Icon= this.glassBin
  // TODO: change the value name of the category related to the db
  switch(cat){
    case"Other": Icon = this.otherBin; break;
    case"Glass":  Icon = this.glassBin; break;
    case"Recycling":  Icon = this.recycleBin; break;
    case"Wood":  Icon = this.woodBin; break;
    case"Waste":  Icon = this.wasteBin; break;
    case"Cardboard":  Icon = this.cardboardBin; break;
    case"Metal":  Icon = this.metalBin; break;
    case"Compost": Icon = this.compostBin; break;
    case"Plastic":  Icon = this.plasticBin; break;
    case"Clothes": Icon = this.clothesBin; break;
    default: Icon = this.otherBin; break;
  }
  return Icon
}
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
