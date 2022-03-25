import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  messages: any[];
  newMsg = '';
  id;
  activeUser;

  constructor(
    private chatService: UserService,
    private router: Router,
    public angularFirestore: AngularFirestore,

    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    let id = this.route.snapshot.params.id;
    this.id = id;
    let currentUser = await this.chatService.getCurrentUser();
    const snapshot = await this.angularFirestore
      .collection('users')
      .ref.where('userType', '==', 'Learner')
      .get();
    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    users.map((u) => {
      if (u.id === id) {
        this.activeUser = u;
      }
    });
    this.angularFirestore
      .collection('messages')
      .ref.orderBy('createdAt')
      .onSnapshot((querySnapshot) => {
        this.messages = [];
        querySnapshot.forEach((doc) => {
          if (
            (id === doc.data().from && currentUser === doc.data().to) ||
            (currentUser === doc.data().from && id === doc.data().to)
          ) {
            this.messages.push({
              ...doc.data(),
              fromName: this.chatService.getUserForMsg(doc.data().from, users),
              myMsg: currentUser === doc.data().from,
            });
          }
        });
      });
  }

  sendMessage() {
    this.chatService.addChatMessage(this.newMsg, this.id).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });
  }
}
