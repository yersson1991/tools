import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private afs: AngularFirestore) { }

  async sendMessage(idSender: any, idReceiver: any, text: string) {
    this.afs.collection('chats').doc(idSender.uid).collection('conversations').doc(idReceiver.uid)
      .get().subscribe(
        async doc => {
          if (!doc.exists) {
            await this.afs.collection('chats').doc(idSender.uid).collection('conversations').doc(idReceiver.uid).set({
              idUser: idReceiver.uid,
              displayName: idReceiver.displayName,
              photoURL: idReceiver.photoURL,
              messages: [{ idSender: idSender.uid, text, createdAt: moment().format() }]
            });
            await this.afs.collection('chats').doc(idReceiver.uid).collection('conversations').doc(idSender.uid).set({
              idUser: idSender.uid,
              displayName: idSender.displayName,
              photoURL: idSender.photoURL,
              messages: [{ idSender: idSender.uid, text, createdAt: moment().format() }]
            });
          } else {
            const messages = doc.data().messages;
            await this.afs.collection('chats').doc(idSender.uid).collection('conversations').doc(idReceiver.uid).update({
              messages: [ ...messages, { idSender: idSender.uid, text, createdAt: moment().format() }]
            });
            await this.afs.collection('chats').doc(idReceiver.uid).collection('conversations').doc(idSender.uid).update({
              messages: [ ...messages, { idSender: idSender.uid, text, createdAt: moment().format() }]
            });
          }
        }
      )
  }

  getAllChatByUser(idUser: string): Observable<any> {
    return this.afs.collection('chats').doc(idUser).collection('conversations').valueChanges();
  }

  getConversation(idUser: string, idReceiver: string): Observable<any> {
    return this.afs.collection('chats').doc(idUser).collection('conversations').doc(idReceiver).valueChanges();
  }
}