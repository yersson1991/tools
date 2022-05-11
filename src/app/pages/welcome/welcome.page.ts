import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, IonSlides, NavController } from "@ionic/angular";
import { Storage } from '@capacitor/storage';

import { AppLanguageService } from 'src/app/shared/services/app-language.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage {
  showSkip = true;
  continueButton = "Continuar";

  @ViewChild('slides', { static: true }) slides: IonSlides;

  constructor(
    private menu: MenuController,
    private appLanguage: AppLanguageService,
    private navCtrl: NavController
  ) { }


  async startApp(): Promise<void> {
    await this.navCtrl.navigateRoot('/login');
    await Storage.set({ key: 'didWelcome', value: 'true' });
  }

  onSlideChangeStart(event): void {
    event.target.isEnd().then((isEnd: Boolean) => {
      this.showSkip = !isEnd
    });
  }

  ionViewWillEnter() {
    this.menu.enable(false, 'first');
  }
}
