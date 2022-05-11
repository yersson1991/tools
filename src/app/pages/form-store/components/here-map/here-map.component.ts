import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";

import { environment } from 'src/environments/environment';

declare var H: any;

@Component({
  selector: 'here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss']
})
export class HereMapComponent implements OnInit {
  @Output() location = new EventEmitter<any>();
  @Input() currentLatitude: number;
  @Input() currentLongitude: number;
  @Input() addressText: string;
  @Input() validateBtnText: string;
  @Input() requiredText: string;
  @ViewChild("map") public mapElement: ElementRef;
  addressCtrl: FormControl;
  private platform: any;
  private map: any;
  private behavior: any;
  private geocodingService: any;

  constructor() {
    this.addressCtrl = new FormControl('', [Validators.required]);
  }

  ngOnInit(): void {
    this.initializePlatform();
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  private initializePlatform(): void {
    this.platform = new H.service.Platform({
      "app_id": environment.hereMapsConfig.appId,
      "app_code": environment.hereMapsConfig.appCode,
      "useHTTPS": true
    });
  }

  private initializeMap(): void {
    setTimeout(async () => {
      const defaultLayers = this.platform.createDefaultLayers();
      this.map = new H.Map(
        this.mapElement.nativeElement,
        defaultLayers.normal.map,
        {
          zoom: 18,
          center: { lat: this.currentLatitude, lng: this.currentLongitude }
        }
      );
      const mapEvents = new H.mapevents.MapEvents(this.map);
      this.behavior = new H.mapevents.Behavior(mapEvents);
      this.geocodingService = this.platform.getGeocodingService();

      const marker = new H.map.Marker({ lat: this.currentLatitude, lng: this.currentLongitude });
      
      this.addDraggableMarker(this.map, this.behavior, marker);
      const geocode = await this.geocodingReverseGeocode(this.currentLatitude, this.currentLongitude);
      this.addressCtrl.setValue(geocode.address);

      this.location.emit({
        lat: this.currentLatitude,
        lng: this.currentLongitude,
        address: geocode.address,
      });
      
      window.addEventListener('resize', () => this.map.getViewPort().resize());
    }, 100);
  }

  private addDraggableMarker(map: any, behavior: any, marker: any) {
    marker.draggable = true;
    map.addObject(marker);

    map.addEventListener('dragstart', (ev: any) => {
      const target = ev.target;
      const pointer = ev.currentPointer;
      if (target instanceof H.map.Marker) {
        const targetPosition = map.geoToScreen(target.getGeometry());
        target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
        behavior.disable();
      }
    }, false);

    map.addEventListener('dragend', async (ev: any) => {
      const target = ev.target;
      if (target instanceof H.map.Marker) {
        behavior.enable();
        try {
          const res = await this.geocodingReverseGeocode(target.b.lat, target.b.lng); 
          this.addressCtrl.setValue(res.address);
          this.location.emit({
            lat: res.lat,
            lng: res.lng,
            address: res.address,
          });
        } catch (error) {
          console.error(error);
        }
      }
    }, false);

    map.addEventListener('drag', (ev: any) => {
      const target = ev.target;
      const pointer = ev.currentPointer;
      if (target instanceof H.map.Marker) {
        target.setGeometry(map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y));
      }
    }, false);
  }

  async validateAddress(event: Event) {
    event.preventDefault();
    if (this.addressCtrl.valid) {
      try {
        this.map.removeObjects(this.map.getObjects());
        const resGeocode = await this.geocodingGeocode();
        // More precise address
        const resReverseGeocode = await this.geocodingReverseGeocode(resGeocode.lat, resGeocode.lng);
        this.addressCtrl.setValue(resReverseGeocode.address);
  
        this.location.emit({
          lat: resReverseGeocode.lat,
          lng: resReverseGeocode.lng,
          address: resReverseGeocode.address
        });
      } catch(error) {
        console.error(error);
      }
    } else {
      this.addressCtrl.markAllAsTouched();
    }
  }

  private geocodingReverseGeocode(lat: any, lng: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.geocodingService.reverseGeocode(
        {
          mode: 'retrieveAddress',
          maxresults: 1,
          prox: lat + "," + lng
        },
        (success: any) => {
          const addressFull = success.Response.View[0].Result[0].Location.Address.Label;
          const address = addressFull.split(',')[0];
          
          resolve({
            lat,
            lng,
            address
          });
        },
        (error: any) => {
          reject(error);
        }
      )
    });
  }

  private geocodingGeocode(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.geocodingService.geocode(
        { 
          searchtext: `${this.addressCtrl.value}, Bogotá Colombia`
        },
        (success: any) => {
          const location = success.Response.View[0].Result[0].Location.DisplayPosition;
          const marker = new H.map.Marker(
            {
              lat: location.Latitude,
              lng: location.Longitude
            },
            {
              volatility: true
            }
          );
          this.addDraggableMarker(this.map, this.behavior, marker);

          this.map.setCenter({
            lat: location.Latitude,
            lng: location.Longitude
          });

          resolve({ lat: location.Latitude, lng: location.Longitude });
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }
}