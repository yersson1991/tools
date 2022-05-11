import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Geolocation } from "@capacitor/geolocation";

import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { Store } from 'src/app/interfaces/store';
import { User } from 'src/app/interfaces/user';
import { Product } from 'src/app/interfaces/products';

@Component({
  selector: 'app-form-store',
  templateUrl: './form-store.page.html',
  styleUrls: ['./form-store.page.scss'],
})
export class FormStorePage implements OnInit {
  form: FormGroup;
  location: any;
  currentLatitude: number;
  currentLongitude: number;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private storeService: StoreService,
    private dataStorageService: DataStorageService
  ) {
    this.buildForm();
  }

  async ngOnInit() {
    try {
      const location = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = location.coords;
      this.currentLatitude = latitude;
      this.currentLongitude = longitude;
    } catch(error) {
      this.currentLatitude = 4.6097102
      this.currentLongitude = -74.081749;
    }
    
  }

  async createStore(): Promise<void> {
    if (this.form.valid) {
      window.dispatchEvent(new CustomEvent('user:ally'));
      const user: User = await this.dataStorageService.getUser();
      const { lat, lng, address } = this.location;
      
      const newStore: Store = {
        idUser: user.uid,
        owner: user.displayName,
        name: this.nameField.value,
        cellPhone: this.cellPhoneField.value ? this.cellPhoneField.value : null,
        localPhone: this.localPhoneField.value ? this.localPhoneField.value : null,
        photoURL: null,
        products: new Array<Product>(),
        location: [lat, lng],
        address
      }

      await this.storeService.saveStore(newStore)
      this.navCtrl.navigateRoot('/ally');
    } else {
      this.form.markAllAsTouched();
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      nit: ['', [Validators.required, Validators.min(100000), Validators.max(99999999999)]],
      cellPhone: [''],
      localPhone: ['']
    });
  }

  get nameField(): AbstractControl {
    return this.form.get('name');
  }

  get nitField(): AbstractControl {
    return this.form.get('nit');
  }

  get cellPhoneField(): AbstractControl {
    return this.form.get('cellPhone');
  }

  get localPhoneField(): AbstractControl {
    return this.form.get('localPhone');
  }

  getLocation(location: any) {
    this.location = location;
  }
}
