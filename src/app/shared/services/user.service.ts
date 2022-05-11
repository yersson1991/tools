import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";

import firebase from 'firebase/compat/app';
import { User } from '../../interfaces/user';
import { Role } from 'src/app/interfaces/enums';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersCollection: AngularFirestoreCollection<User>;

  constructor(
    private afs: AngularFirestore,
    private dataStorage: DataStorageService
  ) {
    this.usersCollection = afs.collection<User>('users');

  }

  async saveUser(user: firebase.User, provider: string): Promise<User> {
    const { uid, displayName, photoURL } = user;
    const newUser: User = {
      uid,
      displayName,
      photoURL,
      roles: [Role.Customer],
      selectedRole: Role.Customer,
      provider,
    }
    console.log(user, 1234);
    await this.usersCollection.doc(uid).set(newUser);
    await this.dataStorage.saveUser(newUser);
    return newUser;
  }

  getUser(uid: string): Observable<User> {
   return this.afs.doc<User>(`users/${uid}`).valueChanges();
  }

  updateSelectedRole(id: string, role: string): Promise<void> {
    return this.usersCollection.doc<User>(id).update({
      selectedRole: role
    });
  }
}