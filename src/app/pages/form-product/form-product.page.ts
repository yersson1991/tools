import { Component } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { NavController } from "@ionic/angular";

import { StoreService } from 'src/app/shared/services/store.service';
import { Product } from 'src/app/interfaces/products';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.page.html',
  styleUrls: ['./form-product.page.scss'],
})
export class FormProductPage {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService,
    private dataStorageService: DataStorageService,
    private navCtrl: NavController,
  ) {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  get nameField(): AbstractControl {
    return this.form.get('name');
  }

  get priceField(): AbstractControl {
    return this.form.get('price');
  }

  get quantityField(): AbstractControl {
    return this.form.get('quantity');
  }

  async saveProduct(): Promise<void> {
    if (this.form.valid) {
      const user = await this.dataStorageService.getUser();
      const newProduct: Product = {
        name: this.nameField.value,
        price: this.priceField.value,
        quantity: this.quantityField.value,
        photoURL: null
      }
      await this.storeService.saveProduct(user.uid, newProduct);

      this.navCtrl.navigateRoot('/ally');
    } else {
      this.form.markAllAsTouched();
    }
  }

}
