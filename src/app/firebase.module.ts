import { NgModule } from '@angular/core';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireRemoteConfigModule } from '@angular/fire/compat/remote-config';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireRemoteConfigModule,
    AngularFirestoreModule,
  ],
  exports: [
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireRemoteConfigModule,
    AngularFirestoreModule,
  ],
})
export class FirebaseModule {}
