import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import firebase from 'firebase/compat/app';
import { Store } from 'src/app/interfaces/store';
import { Product } from 'src/app/interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private storeCollection: AngularFirestoreCollection<Store>;

  constructor(private afs: AngularFirestore) {
    this.storeCollection = this.afs.collection<Store>('stores');
  }

  getStore(id: string) {
    return this.storeCollection.doc<Store>(id).valueChanges();
  }

  async saveStore(store: Store): Promise<Store> {
    const { idUser } = store;
    await this.storeCollection.doc(idUser).set(store);
    return store;
  }

  getAllStores() {
    return this.storeCollection.valueChanges();
  }

  async saveProduct(idStore: string, product: Product): Promise<Product> {
    const newProduct = firebase.firestore.FieldValue.arrayUnion(product) as unknown as Product[]
    await this.storeCollection.doc(idStore).update({
      products: newProduct
    });
    return product;
  }
    async updateStore(store: Store): Promise<Store> {
    const { idUser } = store;
    await this.storeCollection.doc(idUser).update(store);
    return store;
  }


}