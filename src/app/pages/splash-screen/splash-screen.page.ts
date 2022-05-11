import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

import { AppLanguageService } from 'src/app/shared/services/app-language.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private appLanguageService: AppLanguageService,
    private authService: AuthService,
    private dataStorageService: DataStorageService
  ) { }

  async ngOnInit() {
    // Load and save application texts
    await this.appLanguageService.saveAppTexts();
    // Navigation to the next page
    const didWelcome = await Storage.get({ key: 'didWelcome' });
    if (didWelcome.value !== 'true') {
      this.navCtrl.navigateRoot('/welcome');
    } else {
      const sub = this.authService.user.subscribe(
        async user => {
          if (!user) {
            this.navCtrl.navigateRoot('/login');
            sub.unsubscribe();
          } else {
            const userStorage = await this.dataStorageService.getUser();
            if (userStorage) {
              this.navCtrl.navigateRoot(`/${userStorage.selectedRole}`);
            } else {
              this.navCtrl.navigateRoot('/login');
            }
          }
        }
      );
    }
  }
}
