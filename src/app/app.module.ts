import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { FirebaseModule } from './firebase.module';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// Auth Providers
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { Facebook } from '@ionic-native/facebook/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { OptionsPopover } from './pages/options-popover/options-popover';

@NgModule({
    declarations: [AppComponent, OptionsPopover],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        FirebaseModule,
    ],
    providers: [
        GooglePlus,
        Facebook,
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
