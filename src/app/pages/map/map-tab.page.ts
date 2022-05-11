import { Component, OnInit } from '@angular/core';
import { PopoverController, AlertController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';

import { OptionsPopover } from '../options-popover/options-popover';
import { StoreService } from 'src/app/shared/services/store.service';
import { Store } from 'src/app/interfaces/store';

@Component({
  selector: 'app-map-tab',
  templateUrl: './map-tab.page.html',
  styleUrls: ['./map-tab.page.scss']
})
export class MapTabPage implements OnInit {
  stores: Array<Store>;
  currentLatitude: number;
  currentLongitude: number;
  titleText = 'Mapa';

  constructor(
    private popoverCtrl: PopoverController,
    private storeService: StoreService,
    private alertCtrl: AlertController,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getCurrentPosition();

    this.storeService.getAllStores().subscribe(
      stores => {
        this.stores = stores;
      }
    )
  }

  private async getCurrentPosition() {
    try {
      const location = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = location.coords;
      this.currentLatitude = latitude;
      this.currentLongitude = longitude;
    } catch (error) {
      this.currentLatitude = 4.6097102,
      this.currentLongitude = -74.081749
      await this.presentAlert();
    }
  }

  async presentPopover(event: Event): Promise<void> {
    const popover = await this.popoverCtrl.create({
      component: OptionsPopover,
      event
    });
    await popover.present();
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertCtrl.create({
      message: 'Active permisos de geolocalización',
      buttons: ['ok']
    });
    await alert.present();
  }
}