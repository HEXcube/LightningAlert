import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import leaflet from 'leaflet';
import { WeatherService } from 'src/app/services/weather.service';
import { MlService } from 'src/app/services/ml.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss']
})
export class MapPage implements OnInit {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  constructor(
    private nav: NavController,
    public menuCtrl: MenuController,
    private weather: WeatherService,
    private ml: MlService
  ) {}

  ngOnInit() {
    this.ml.getPrediction();
  }

  /*
    Re-enable sidebar (It was disabled in login page)
    https://ionicframework.com/docs/api/menu
  */
  ionViewWillEnter() {
    this.menuCtrl.enable(true, 'side-drawer');
  }

  openSideDrawer() {
    this.menuCtrl.open('side-drawer');
  }

  ionViewDidEnter() {
    this.loadmap();
  }

  loadmap() {
    this.map = leaflet.map('map').fitWorld();
    leaflet
      .tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attributions:
          // tslint:disable-next-line:max-line-length
          'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
      })
      .addTo(this.map);
    this.map
      .locate({
        setView: true,
        maxZoom: 10
      })
      .on('locationfound', e => {
        const markerGroup = leaflet.featureGroup();
        const marker: any = leaflet
          .marker([e.latitude, e.longitude])
          .on('click', () => {
            alert('Marker clicked');
          });
        const circle: any = leaflet
          .circle([e.latitude, e.longitude], 25000)
          .on('click', () => {
            alert('Marker clicked');
          });
        const circle2: any = leaflet
          .circle([e.latitude, e.longitude], 10000)
          .on('click', () => {
            alert('Marker clicked');
          });
        markerGroup.addLayer(marker);
        markerGroup.addLayer(circle);
        markerGroup.addLayer(circle2);
        this.map.addLayer(markerGroup);

        // this.weather.getCurrentWeatherDetails(e.latitude, e.longitude);
      })
      .on('locationerror', err => {
        alert(err.message);
      });
  }
}
