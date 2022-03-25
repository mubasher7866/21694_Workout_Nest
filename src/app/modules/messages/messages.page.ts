import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FormManager } from 'src/app/services/forms/form-manager';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagePage {
  usersList: any[];
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private formManager: FormManager,
    private loadingCtrl: LoadingController,
    private router: Router,
    private angularFirestore: AngularFirestore
  ) {}

  async ionViewDidEnter() {
    const id = await this.userService.token;
    const snapshot = await this.angularFirestore
      .collection('users')
      .ref.where('userType', '==', 'Learner')
      .get();
    const users = snapshot.docs
      .filter((doc) => doc.id != id)
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    this.usersList = users;
    console.log(users);
  }

  async doRefresh(event: any) {
    await this.ionViewDidEnter();
    if (event) await event.target.complete();
    // Hack to fix behavior issue described in:
    // https://stackoverflow.com/questions/59841717/ion-refresher-bug-in-ionic
    event.target.disabled = true;
    event.target.disabled = false;
  }
}
