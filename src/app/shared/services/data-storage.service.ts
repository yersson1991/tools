import { Injectable } from "@angular/core";
import { Storage } from "@capacitor/storage";
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private static ERROR_TEXT: string = 'DataStorageServiceError'

  async saveUser(user: User): Promise<User> {
    try {
      await Storage.set({
        key: 'user',
        value: JSON.stringify(user),
      });
      return user;
    } catch(err) {
      console.error(`${DataStorageService.ERROR_TEXT}/saveUser: ${err}`);
    }
  }

  async getUser(): Promise<User> {
    try {
      const data = await Storage.get({ key: 'user' });
      const user = JSON.parse(data.value);
      return user as User;
    } catch(err) {
      console.error(`${DataStorageService.ERROR_TEXT}/getUser: ${err}`);
    }
  }

  async getTextsApplication(): Promise<any> {
    try {
      const data = await Storage.get({ key: 'texts' });
      const texts = JSON.parse(data.value);
      return texts;
    } catch(err) {
      console.error(`${DataStorageService.ERROR_TEXT}/setTextsApplication: ${err}`);
    }
  }
}