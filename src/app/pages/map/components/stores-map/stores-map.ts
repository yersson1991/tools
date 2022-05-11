import { Component, Input, ViewChild, ElementRef, OnInit } from "@angular/core";
import { ModalController } from '@ionic/angular';

import { environment } from 'src/environments/environment';
import { Store } from 'src/app/interfaces/store';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { ActionStoreMapComponent } from 'src/app/pages/action-store-map/action-store-map';

declare var H: any;

@Component({
  selector: 'stores-map',
  templateUrl: './stores-map.html'
})
export class StoresMap implements OnInit {
  @Input() stores: Array<Store>;
  @ViewChild("storesMap") public mapElement: ElementRef;
  @Input() currentLatitude: number;
  @Input() currentLongitude: number;
  private platform: any;
  private map: any;

  constructor(
    private dataStorageService: DataStorageService,
    private modalCtrl: ModalController
  ) {}

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
          zoom: 12,
          center: { lat: this.currentLatitude, lng: this.currentLongitude }
        }
      );
      const mapEvents = new H.mapevents.MapEvents(this.map);
      new H.mapevents.Behavior(mapEvents);
 
      this.map.removeObjects(this.map.getObjects());

      const user = await this.dataStorageService.getUser();
      this.stores.forEach(el => {
        if (user.uid !== el.idUser) { 
          this.addMarker(el.location[0], el.location[1], el.idUser);
        }
      });  
    }, 100);
  }

  private addMarker(lat: Number, lng: Number, idReceiver: string): void {
    const marker = new H.map.Marker({ lat, lng });
    this.map.addObject(marker);
    
    marker.addEventListener('tap', () => {
      this.presentModal(idReceiver);
    }, false);
  }

  async presentModal(idAlly: string): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ActionStoreMapComponent,
      componentProps: { idAlly },
      cssClass: 'my-custom-modal-css'
    });
    return modal.present();
  }
}