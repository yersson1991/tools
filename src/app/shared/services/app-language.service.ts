import { Injectable } from "@angular/core";
import { AngularFireRemoteConfig } from '@angular/fire/compat/remote-config';
import { Storage } from "@capacitor/storage"  ;

@Injectable({
  providedIn: 'root'
})
export class AppLanguageService {
  constructor(private afRemoteConfig: AngularFireRemoteConfig) {}

  private async getAllAppTexts(): Promise<string> {
    return this.afRemoteConfig.strings.texts.toPromise();
  }

  async saveAppTexts(): Promise<void> {
    const texts = await this.getAllAppTexts();    
    await Storage.set({ key: 'texts', value: texts });
  }

  async getPageTexts(page: string): Promise<any> {
    const texts = await Storage.get({ key: 'texts' });
    const textsObj = JSON.parse(texts.value);
    return textsObj[page];
  }
}