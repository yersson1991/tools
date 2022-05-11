import { Component, OnInit } from '@angular/core';
import { OptionsPopover } from '../options-popover/options-popover';
import { PopoverController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { Store } from 'src/app/interfaces/store';
import { Product } from 'src/app/interfaces/products';


@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  store: Store;
  products: Array<Product>;
  isLoading: boolean = true;
  storeOwner: boolean;


  constructor(
    private popoverCtrl: PopoverController,
    private dataStorageService: DataStorageService,
    private storeService: StoreService,
    private router: ActivatedRoute,
  ) { }

  async ngOnInit() {
    const id = this.router.snapshot.paramMap.get('id');
    
    if (id) {
      this.storeOwner = false;
      this.storeService.getStore(id).subscribe(
        store => {
          if (store) {
            this.isLoading = false;
            this.store = store;
            this.products = store.products;
          } else {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.storeOwner = true;
      const { uid } = await this.dataStorageService.getUser();
      this.storeService.getStore(uid).subscribe(
        store => {
          if (store) {
            this.isLoading = false;
            this.store = store;
            this.products = store.products;
          } else {
            this.isLoading = false;
          }
        }
      );
    }
  }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: OptionsPopover,
      event
    });
    await popover.present();
  }

}
